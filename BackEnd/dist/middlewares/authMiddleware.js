"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

 function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ errors: ['Token não fornecido'] });

  _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ errors: ['Token inválido'] });
    req.user = user;
    next();
  });
} exports.authenticateToken = authenticateToken;
