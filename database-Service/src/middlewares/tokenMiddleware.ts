import { Request, Response, NextFunction } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  if (token !== '1234') {
    return res.status(403).json({ error: 'Token inválido' });
  }

  next();
}
