import express, { Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import { logger } from './services/logger.service';
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware';

const app = express();

app.use(express.static(path.join(__dirname, 'dist/airbnb')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/airbnb/index.html'));
});

app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(cors());
const http = require('http').createServer(app);

if (process.env['NODE_ENV'] === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    credentials: true
  };
  app.use(cors(corsOptions));
}

// Import routes
import { router as stayRoutes } from './api/stay/stay.routes';
import { router as orderRoutes } from './api/order/order.routes';
import { router as userRoutes } from './api/user/user.routes';
import { router as authRoutes } from './api/auth/auth.routes';

// Setup routes
app.all('*', setupAsyncLocalStorage);
app.use('/api/stay', stayRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/**', (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env['PORT'] || 3030;
http.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
