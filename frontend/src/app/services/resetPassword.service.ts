import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:3001/reset'; // Altere para a URL da sua API
  private timeoutMinutes = 5; // Tempo limite em minutos
  private maxAttempts = 2; // Máximo de tentativas

  constructor() {}

  // Enviar solicitação de redefinição de senha
  async requestPasswordReset(email: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/forgotpassword`, {
        email,
      });
      sessionStorage.setItem('resetEmail', email);
      sessionStorage.setItem('resetStartTime', Date.now().toString());
      sessionStorage.setItem('attempts', '0');
      return response.data;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  }

  // Verificar o código de verificação
  async verifyCode(code: string) {
    const email = sessionStorage.getItem('resetEmail');
    const startTime = parseInt(
      sessionStorage.getItem('resetStartTime') || '0',
      10
    );
    const attempts = parseInt(sessionStorage.getItem('attempts') || '0', 10);

    if (!email) {
      throw new Error('No email found in session');
    }

    const currentTime = Date.now();
    const timeElapsed = (currentTime - startTime) / 1000 / 60; // Convert to minutes

    if (timeElapsed > this.timeoutMinutes) {
      this.clearSession();
      throw new Error('Time limit expired. Please request a new code.');
    }

    if (attempts >= this.maxAttempts) {
      this.clearSession();
      throw new Error(
        'Maximum number of attempts exceeded. Please request a new code.'
      );
    }

    try {
      const response = await axios.post(`${this.apiUrl}/verify-code`, {
        email,
        code,
      });
      sessionStorage.setItem('resetCode', code);
      sessionStorage.setItem('attempts', (attempts + 1).toString());
      return response.data;
    } catch (error) {
      sessionStorage.setItem('attempts', (attempts + 1).toString());
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
      this.clearSession();
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  // Limpar dados da sessão
  private clearSession() {
    sessionStorage.removeItem('resetEmail');
    sessionStorage.removeItem('resetStartTime');
    sessionStorage.removeItem('resetCode');
    sessionStorage.removeItem('attempts');
  }
}
