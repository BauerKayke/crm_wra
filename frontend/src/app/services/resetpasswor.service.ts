import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:3001/reset'; // Altere para a URL da sua API

  constructor() {}

  // Enviar solicitação de redefinição de senha
  async requestPasswordReset(email: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/forgotpassword`, {
        email,
      });
      sessionStorage.setItem('resetEmail', email);
      return response.data;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  }

  // Verificar o código de verificação
  async verifyCode(code: string) {
    const email = sessionStorage.getItem('resetEmail');
    if (!email) {
      throw new Error('No email found in session');
    }
    try {
      const response = await axios.post(`${this.apiUrl}/verify-code`, {
        email,
        code,
      });
      sessionStorage.setItem('resetCode', code);
      return response.data;
    } catch (error) {
      console.error('Error verifying code:', error);
      throw error;
    }
  }

  // Redefinir a senha
  async resetPassword(newPassword: string) {
    const email = sessionStorage.getItem('resetEmail');
    const code = sessionStorage.getItem('resetCode');
    if (!email || !code) {
      throw new Error('Email or code not found in session');
    }
    try {
      const response = await axios.post(`${this.apiUrl}/reset-password`, {
        email,
        code,
        newPassword,
      });
      sessionStorage.removeItem('resetEmail');
      sessionStorage.removeItem('resetCode');
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
}
