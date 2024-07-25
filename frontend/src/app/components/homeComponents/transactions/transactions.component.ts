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
  isCreateTransactionOpen = false;

  constructor(private transactionService: TransactionService) {}

  async ngOnInit() {
    try {
      const response = await this.transactionService.getTransactions();
      this.transactions = response; // Define a lista de transações
      this.transactionCount = this.transactions.length; // Atualiza o contador de transações
      this.netIncome = this.transactions.reduce(
        (total, tx) => total + (tx.price || 0),
        0
      ); // Calcula o net income
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  }

  openCreateTransaction() {
    this.isCreateTransactionOpen = true;
  }

  closeCreateTransaction() {
    this.isCreateTransactionOpen = false;
  }

  onTransactionCreated(transaction: any) {
    this.transactions.push(transaction);
    this.transactionCount = this.transactions.length;
    this.netIncome += transaction.price || 0;
    this.closeCreateTransaction();
  }

  formatPrice(price: number): string {
    if (price >= 1_000_000) {
      return `$${(price / 1_000_000).toFixed(1)}M`;
    } else if (price >= 1_000) {
      return `$${(price / 1_000).toFixed(1)}K`;
    } else {
      return `$${price.toFixed(2)}`;
    }
  }
}
