import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  async login(email: string, password: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/users/login/`, {
        params: { email, password },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error;
    }
  }

  async register(name: string, email: string, phone: string, password: string) {
    try {
      console.log(name, email, password, phone);

      const response = await axios.post(`${this.apiUrl}/users/register/`, {
        name,
        email,
        phone,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer registro', error);
      throw error;
    }
  }
}
