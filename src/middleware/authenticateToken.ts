import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Désactiver JWT pendant les tests
  if (ENV.NodeEnv === 'test') {
    return next();
  }

  // Autoriser la route publique /generatetoken
  if (req.originalUrl.includes('/generatetoken')) {
    return next();
  }

  // Vérifier presence du header "Authorization"
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
  }

  // Extraire le token
  const token = authHeader.split(' ')[1];

  // Vérifier le token JWT
  jwt.verify(token, ENV.Jwtsecret as string, (err) => {
    if (err) return res.sendStatus(HttpStatusCodes.FORBIDDEN);
    next();
  });
}

export default authenticateToken;
