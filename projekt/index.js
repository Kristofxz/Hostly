const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const secretKey = 'valami-titkos-kulcs'; 

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
app.use(express.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'airbnb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});


app.post('/html/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const query = 'SELECT * FROM felhasznalok WHERE email = ? AND jelszo = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database query error: ' + err);
      return res.status(500).send('Internal server error');
    }

    if (results.length > 0) {

      const token = jwt.sign({ id: results[0].id, email: results[0].email }, secretKey, { expiresIn: '1h' });


      return res.status(200).json({ message: 'Login successful', token });
    } else {
      return res.status(401).send('Invalid email or password');
    }
  });
});
app.post('/html/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;


  const queryCheckEmail = 'SELECT * FROM felhasznalok WHERE email = ?';
  connection.query(queryCheckEmail, [email], (err, results) => {
    if (err) {
      console.error('Database query error during email check: ' + err);
      return res.status(500).json({ message: 'Database query error during email check' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van!' });
    }

 
    const queryInsert = 'INSERT INTO felhasznalok (kNev, vNev, email, jelszo) VALUES (?, ?, ?, ?)';
    connection.query(queryInsert, [firstName, lastName, email, password], (err, results) => {
      if (err) {
        console.error('Database query error during insert: ' + err);
        return res.status(500).json({ message: 'Database query error during insert' });
      }

      return res.status(201).json({ message: 'Sikeres regisztráció' });
    });
  });
});



const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token.');
    }
    req.user = user; 
    next();
  });
};

app.get('/protected', authenticateJWT, (req, res) => {
  res.send(`Welcome, ${req.user.email}`);
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
