/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ errors: ['Token não fornecido'] });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ errors: ['Token inválido'] });
    req.user = user;
    next();
  });
}
