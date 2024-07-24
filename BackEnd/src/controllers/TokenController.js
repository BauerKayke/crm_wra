/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

class TokenController {
  async index(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token);
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      console.log(res);
      return res.status(200).json({ message: 'Token is valid' });
    });
  }
}

export default new TokenController();
