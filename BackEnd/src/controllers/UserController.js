import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      console.log(req.body);
      const {
        name, email, phone, password,
      } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({ errors: ['Todos os campos são obrigatórios.'] });
      }

      const user = await User.findOne({ where: { email } });
      console.log(user);
      if (user) {
        return res.status(400).json({ errors: ['Usuário já existe.'] });
      }
      console.log('Passou');
      const novoUser = await User.create(req.body);
      console.log(novoUser);
      const { id, name: nome, email: emailUser } = novoUser;
      return res.status(201).json({
        id, nome, emailUser,
      });
    } catch (e) {
      console.log(e.error);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.passwordIsValid(password))) {
        return res.status(401).json({ errors: ['Invalid credentials'] });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } catch (e) {
      return res.status(500).json({ errors: e.message });
    }
  }
}

export default new UserController();
