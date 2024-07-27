"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable max-len */
/* eslint-disable consistent-return */
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _mailer = require('../config/mailer'); var _mailer2 = _interopRequireDefault(_mailer); // Importar o transporter configurado

class PasswordController {
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await _User2.default.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const verificationCode = _crypto2.default.randomBytes(3).toString('hex').toUpperCase();
      user.validation_code = verificationCode; // Atualize o nome do campo para 'validation_code'
      await user.save();

      // Envia o e-mail com o código de verificação
      await _mailer2.default.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Ajuste conforme necessário
        to: email,
        subject: 'Password Reset Code',
        text: `Your verification code is ${verificationCode}`,
        html: `<b>Your verification code is ${verificationCode}</b>`,
      });

      res.json({ message: 'Verification code sent' });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, code } = req.body;
      const user = await _User2.default.findOne({ where: { email, validation_code: code } }); // Atualize o nome do campo para 'validation_code'

      if (!user) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }

      res.json({ message: 'Code verified' });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;
      const user = await _User2.default.findOne({ where: { email, validation_code: code } }); // Atualize o nome do campo para 'validation_code'

      if (!user) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }

      user.password = newPassword; // Define a senha no campo virtual para hash
      user.validation_code = null;
      await user.save();

      res.json({ message: 'Password updated' });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

exports. default = new PasswordController();
