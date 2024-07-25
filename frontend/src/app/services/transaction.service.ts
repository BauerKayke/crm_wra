import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3001/transactions/';

  async createTransaction(transactionData: any): Promise<any> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(this.apiUrl, transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async getTransactions(): Promise<any[]> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(this.apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Retorna a lista de transações
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }
}
