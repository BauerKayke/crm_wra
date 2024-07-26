import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [FormsModule, CommonModule, CreateTransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactionCount = 0;
  netIncome = 0;
  transactions: any[] = [];
  filteredTransactions: any[] = []; // Transações filtradas
  searchText = ''; // Texto de busca
  isCreateTransactionOpen = false;
  selectedTransaction: any = null;
  isProcessing = false;

  constructor(private transactionService: TransactionService) {}

  async ngOnInit() {
    this.loadTransactions();
  }

  async loadTransactions() {
    try {
      console.log('Loading transactions...');
      this.transactions = await this.transactionService.getTransactions();
      console.log('Loaded transactions:', this.transactions);
      this.filteredTransactions = this.transactions; // Inicialmente, exibe todas as transações
      this.updateTransactionSummary();
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  }

  handleTransactionCreated(newTransaction: any) {
    const existingTransaction = this.transactions.find((txn) => {
      return JSON.stringify(txn) === JSON.stringify(newTransaction);
    });

    if (!existingTransaction) {
      this.transactions.push(newTransaction);
      this.updateTransactionSummary();
      this.filterTransactions(); // Reaplica o filtro
    } else {
      this.handleTransactionUpdated(newTransaction);
    }
  }

  handleTransactionUpdated(updatedTransaction: any) {
    const index = this.findTransactionIndex(updatedTransaction);

    if (index !== -1) {
      this.transactions[index] = updatedTransaction;
      this.updateTransactionSummary();
      this.filterTransactions(); // Reaplica o filtro
    } else {
      console.warn('Transaction not found for update:', updatedTransaction);
    }
  }

  openCreateTransaction() {
    console.log('Opening create transaction modal...');
    this.selectedTransaction = null;
    this.isCreateTransactionOpen = true;
  }

  closeCreateTransaction() {
    console.log('Closing create transaction modal...');
    this.isCreateTransactionOpen = false;
  }

  async onTransactionCreated(transaction: any) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      console.log('Transaction created/update data:', transaction);

      if (typeof transaction.additional_fields === 'string') {
        transaction.additional_fields = JSON.parse(
          transaction.additional_fields
        );
      }

      if (transaction.id) {
        console.log('Updating transaction with ID:', transaction.id);
        await this.transactionService.updateTransaction(
          transaction.id,
          transaction
        );
        console.log('Transaction updated.');
      } else {
        console.log('Creating new transaction:', transaction);
        const existingIndex = this.findTransactionIndex(transaction);
        if (existingIndex !== -1) {
          console.log(
            'Transaction already exists:',
            this.transactions[existingIndex]
          );
          return;
        }

        await this.transactionService.createTransaction(transaction);
        console.log('New transaction created.');
      }

      await this.loadTransactions();
      this.closeCreateTransaction();
    } catch (error) {
      console.error('Failed to create/update transaction:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  async deleteTransaction(transactionId: number) {
    try {
      console.log('Deleting transaction with ID:', transactionId);
      await this.transactionService.deleteTransaction(transactionId);
      console.log('Transaction deleted successfully.');
      this.transactions = this.transactions.filter(
        (tx) => tx.id !== transactionId
      );
      this.updateTransactionSummary();
      this.filterTransactions(); // Reaplica o filtro
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  }

  editTransaction(transaction: any) {
    console.log('Editing transaction:', transaction);
    this.selectedTransaction = { ...transaction };
    this.isCreateTransactionOpen = true;
  }

  formatPrice(price: number): string {
    if (price === undefined || price === null || isNaN(price)) {
      console.log('Invalid price:', price);
      return '0.00';
    }

    console.log('Formatting price:', price);

    if (price >= 1_000_000) {
      return `$${(price / 1_000_000).toFixed(1)}M`;
    } else if (price >= 1_000) {
      return `$${(price / 1_000).toFixed(1)}K`;
    } else {
      return `$${price.toFixed(2)}`;
    }
  }

  private updateTransactionSummary() {
    this.transactionCount = this.transactions.length;
    this.netIncome = this.transactions.reduce(
      (total, tx) => total + (tx.price || 0),
      0
    );
    console.log('Transaction count:', this.transactionCount);
    console.log('Net income:', this.netIncome);
  }

  // Função para filtrar transações com base no texto de busca
  filterTransactions() {
    if (!this.searchText) {
      this.filteredTransactions = this.transactions;
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredTransactions = this.transactions.filter(
        (tx) =>
          tx.address.toLowerCase().includes(searchTextLower) ||
          (tx.mls_number &&
            tx.mls_number.toLowerCase().includes(searchTextLower))
      );
    }
  }

  // Função para encontrar o índice de uma transação na lista
  private findTransactionIndex(transaction: any): number {
    return this.transactions.findIndex((tx) => tx.id === transaction.id);
  }
}
