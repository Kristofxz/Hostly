import { authService } from './auth.service';
import { logger } from '../../services/logger.service';
import { Request, Response } from 'express';

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    const loginToken = authService.getLoginToken(user);

    res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
    res.json(user);
  } catch (err) {
    logger.error('Failed to login: ' + err);
    res.status(401).send({ error: 'Invalid username or password' });
  }
}

async function signup(req: Request, res: Response) {
  try {
    const user = req.body;
    const newUser = await authService.signup(user);

    const loginToken = authService.getLoginToken(newUser);
    res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });

    res.status(201).json(newUser);
  } catch (err) {
    logger.error('Failed to signup: ' + err);
    res.status(400).send({ error: 'Failed to signup' });
  }
}

async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('loginToken', { sameSite: 'none', secure: true });
    res.send({ message: 'Logged out successfully' });
  } catch (err) {
    logger.error('Failed to logout: ' + err);
    res.status(500).send({ error: 'Failed to logout' });
  }
}

export const authController = {
  login,
  signup,
  logout
};
