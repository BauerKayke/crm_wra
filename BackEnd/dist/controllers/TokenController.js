"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* eslint-disable consistent-return */
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class TokenController {
  async index(req, res) {
    const token = _optionalChain([req, 'access', _ => _.headers, 'access', _2 => _2.authorization, 'optionalAccess', _3 => _3.split, 'call', _4 => _4(' '), 'access', _5 => _5[1]]);
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      return res.status(200).json({ message: 'Token is valid' });
    });
  }
}

exports. default = new TokenController();
