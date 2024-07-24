/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import transporter from '../config/mailer'; // Importar o transporter configurado

class UserController {
  async store(req, res) {
    try {
      const {
        nome, email, phone, password,
      } = req.body;

      // Cria um novo usuário, sem validação de e-mail
      const novoUser = await User.create(req.body);

      // Gera um código de validação
      const validationCode = crypto.randomBytes(3).toString('hex').toUpperCase();

      // Armazena o código de validação no banco de dados
      novoUser.validation_code = validationCode;
      await novoUser.save();

      // Envia o e-mail
      await transporter.sendMail({
        from: `"Seu Nome" <${process.env.EMAIL_USER}>`, // Ajuste conforme necessário
        to: email,
        subject: 'Código de Validação de Conta',
        text: `Seu código de validação é ${validationCode}`,
        html: `<b>Seu código de validação é ${validationCode}</b>`,
      });

      // Retorna sucesso
      return res.json({ message: 'Usuário criado. Verifique seu e-mail para o código de validação.' });
    } catch (e) {
      console.error(e);
      const errorMessages = e.errors ? e.errors.map((err) => err.message) : ['Erro ao criar usuário'];
      return res.status(400).json({ errors: errorMessages });
    }
  }

  async validateAccount(req, res) {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || user.validation_code !== code) {
        return res.status(400).json({ errors: ['Código de validação inválido'] });
      }

      user.validation_code = null; // Limpa o código de validação
      await user.save();

      return res.json({ message: 'Conta validada com sucesso. Você pode fazer login agora.' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: ['Erro interno do servidor'] });
    }
  }

  async login(req, res) {
    try {
      const { email, password, rememberMe } = req.body;
      console.log(email, password, rememberMe);
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.passwordIsValid(password))) {
        return res.status(401).json({ errors: ['Credenciais inválidas'] });
      }

      // Gera o token JWT
      const tokenExpiry = rememberMe ? '7h' : '1h';
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: tokenExpiry },
      );
      console.log(token);
      console.log(tokenExpiry);

      return res.json({ token });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: ['Erro interno do servidor'] });
    }
  }
}

export default new UserController();
