/* eslint-disable max-len */
/* eslint-disable consistent-return */
import crypto from 'crypto';
import User from '../models/User';
import transporter from '../config/mailer'; // Importar o transporter configurado

class PasswordController {
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
      user.validation_code = verificationCode; // Atualize o nome do campo para 'validation_code'
      await user.save();

      // Envia o e-mail com o código de verificação
      await transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Ajuste conforme necessário
        to: email,
        subject: 'Password Reset Code',
        text: `Your verification code is ${verificationCode}`,
        html: `<b>Your verification code is ${verificationCode}</b>`,
      });

      res.json({ message: 'Verification code sent' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ where: { email, validation_code: code } }); // Atualize o nome do campo para 'validation_code'

      if (!user) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }

      res.json({ message: 'Code verified' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;
      const user = await User.findOne({ where: { email, validation_code: code } }); // Atualize o nome do campo para 'validation_code'

      if (!user) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }

      user.password = newPassword; // Define a senha no campo virtual para hash
      user.validation_code = null;
      await user.save();

      res.json({ message: 'Password updated' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new PasswordController();
