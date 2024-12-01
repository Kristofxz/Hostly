import bcrypt from 'bcrypt';
import { User } from "../../models/user.model";
import { userService } from '../user/user.service';
import { logger } from '../../services/logger.service';

async function login(username: string, password: string) {
  logger.debug(`auth.service - login with username: ${username}`);

  const users: User[] = await userService.getByUsername(username) as User[];
  if (!users.length) {
    return Promise.reject('Invalid username or password');
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    return Promise.reject('Invalid username or password');
  }

  delete user.password;
  return user;
}

async function signup(user: User) {
  logger.debug(`auth.service - signup with username: ${user.username}, fullname: ${user.fullname}`);

  if (!user.username || !user.password || !user.fullname) {
    return Promise.reject('Missing required signup information');
  }

  const usersExist = await userService.getByUsername(user.username);
  if (usersExist.length) {
    return Promise.reject('Username already taken');
  }

  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);

  return userService.add(user);
}

function getLoginToken(user: User) {
  const tokenPayload = { _id: user._id, username: user.username, fullname: user.fullname };
  return JSON.stringify(tokenPayload);
}

function validateToken(loginToken: string) {
  try {
    const user = JSON.parse(loginToken);
    if (user && user._id && user.username) {
      return user;
    }
  } catch (err) {
    logger.error('Invalid token:', err);
    return null;
  }
  return null;
}

export const authService = {
  signup,
  login,
  getLoginToken,
  validateToken
};
