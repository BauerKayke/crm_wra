import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  async register(nome: string, email: string, phone: string, password: string) {
    return await axios.post(`${this.apiUrl}/users/register`, {
      nome,
      email,
      phone,
      password,
    });
  }

  async validateAccount(email: string, code: string) {
    return await axios.post(`${this.apiUrl}/users/validate`, { email, code });
  }

  async login(email: string, password: string, rememberMe: boolean) {
    const response = await axios.post(`${this.apiUrl}/users/login`, {
      email,
      password,
      rememberMe,
    });
    if (response.data.token) {
      if (typeof window !== 'undefined') {
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
        } else {
          sessionStorage.setItem('token', response.data.token);
        }
      }
    } else {
      throw new Error('Erro ao obter token');
    }
    return response.data;
  }

  getToken() {
    if (typeof window !== 'undefined') {
      // Verifica se estamos no navegador
      return localStorage.getItem('token') || sessionStorage.getItem('token');
    }
    return null;
  }

  logout() {
    if (typeof window !== 'undefined') {
      // Verifica se estamos no navegador
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await axios.get(`${this.apiUrl}/tokens/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async getUserInfo() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await axios.get(`${this.apiUrl}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch {
      return null;
    }
  }
}
