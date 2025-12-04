import { IUserLogin } from '@src/models/User';
import UserService from './UserService';
import jwt from 'jsonwebtoken';
import ENV from '@src/common/constants/ENV';

async function generateToken(utilisateur: IUserLogin): Promise<string> {
  const utilisateurBD = (await UserService.getAll()).find(
    (u) => u.email === utilisateur.email,
  );

  if (utilisateurBD && utilisateurBD.password === utilisateur.password) {
    return jwt.sign(utilisateur.email, ENV.Jwtsecret as string);
  }

  return '';
}

export default {
  generateToken,
} as const;
