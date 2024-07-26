import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3001/transactions/';
  private transactionsCache: any[] = []; // Cache para transações

  private handleError(error: unknown) {
    console.error('Error in TransactionService:', error);
    throw error;
  }

  async createTransaction(transactionData: any): Promise<any> {
    try {
      console.log(
        'Enviando dados para criação de transação:',
        JSON.stringify(transactionData)
      );

      const response = await axios.post(this.apiUrl, transactionData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Resposta da criação de transação:', response.data);
      this.transactionsCache.push(response.data.transaction); // Adiciona a transação ao cache
      return response.data.transaction;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTransactions(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Resposta da obtenção de transações:', response.data);
      this.transactionsCache = response.data; // Atualiza o cache
      return this.transactionsCache;
    } catch (error) {
      this.handleError(error);
      return []; // Retorna um array vazio em caso de erro
    }
  }

  async updateTransaction(
    transactionId: number,
    transactionData: any
  ): Promise<any> {
    try {
      console.log(
        'Enviando dados para atualização de transação:',
        JSON.stringify(transactionData)
      );

      const response = await axios.put(
        `${this.apiUrl}/update/${transactionId}`,
        transactionData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('Resposta da atualização de transação:', response.data);

      // Atualiza o cache após a atualização
      this.transactionsCache = this.transactionsCache.map((trans) =>
        trans.id === transactionId ? response.data : trans
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTransaction(transactionId: number): Promise<void> {
    try {
      console.log('Deletando transação com ID:', transactionId);

      await axios.delete(`${this.apiUrl}/delete/${transactionId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Transação deletada com sucesso.');

      // Remove do cache após a exclusão
      this.transactionsCache = this.transactionsCache.filter(
        (trans) => trans.id !== transactionId
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
