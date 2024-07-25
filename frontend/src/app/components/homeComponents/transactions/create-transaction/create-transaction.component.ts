import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../../../services/address.service';
import { TransactionService } from '../../../../services/transaction.service';
import Cleave from 'cleave.js';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AxiosError } from 'axios';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastModule],
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  providers: [MessageService], // Adiciona o MessageService como provider
})
export class CreateTransactionComponent implements AfterViewInit {
  @Output() transactionCreated = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('priceInput') priceInput!: ElementRef;
  @ViewChild('listingDateInput') listingDateInput!: ElementRef;
  @ViewChild('expirationDateInput') expirationDateInput!: ElementRef;
  @ViewChild('acceptanceDateInput') acceptanceDateInput!: ElementRef;
  @ViewChild('closingDateInput') closingDateInput!: ElementRef;

  isOpen = true;
  showTransactionTypeOptions = false;
  showStatusOptions = false;
  transactionType = 'Residential Sale';
  status = 'Listing';
  address = '';
  city = '';
  state = '';
  zip = '';
  price = 0;
  listingDate: string = '';
  expirationDate: string = '';
  acceptanceDate: string = '';
  closingDate: string = '';

  // Campos adicionais
  additionalInput1 = '';
  additionalInput2 = '';

  transactionTypes = ['Residential Sale', 'Commercial Sale', 'Rental'];
  statusOptions = ['Listing', 'Under Contract', 'Sold'];
  toggleFields: boolean = false;
  errorMsg: string = '';

  constructor(
    private addressService: AddressService,
    private transactionService: TransactionService,
    private messageService: MessageService // Injete o MessageService
  ) {}

  ngAfterViewInit() {
    new Cleave(this.priceInput.nativeElement, {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      prefix: '$',
      signBeforePrefix: true,
    });

    new Cleave(this.listingDateInput.nativeElement, {
      date: true,
      datePattern: ['m', 'd', 'Y'],
      delimiter: '/',
    });

    new Cleave(this.expirationDateInput.nativeElement, {
      date: true,
      datePattern: ['m', 'd', 'Y'],
      delimiter: '/',
    });

    new Cleave(this.acceptanceDateInput.nativeElement, {
      date: true,
      datePattern: ['m', 'd', 'Y'],
      delimiter: '/',
    });

    new Cleave(this.closingDateInput.nativeElement, {
      date: true,
      datePattern: ['m', 'd', 'Y'],
      delimiter: '/',
    });
  }

  async onZipChange() {
    if (this.zip.length === 5 && /^[0-9]+$/.test(this.zip)) {
      this.errorMsg = '';
      try {
        const data = await this.addressService.getAddressByZip(this.zip);
        if (data.places && data.places.length > 0) {
          this.city = data.places[0]['place name'];
          this.state = data.places[0]['state abbreviation'];
        } else {
          this.errorMsg = 'No data found for this ZIP code.';
        }
      } catch (error) {
        this.errorMsg = 'Request failed.';
      }
    } else {
      this.errorMsg = 'Invalid ZIP code.';
    }
  }

  toggleTransactionTypeOptions() {
    this.showTransactionTypeOptions = !this.showTransactionTypeOptions;
  }

  toggleStatusOptions() {
    this.showStatusOptions = !this.showStatusOptions;
  }

  selectTransactionType(type: string) {
    this.transactionType = type;
    this.showTransactionTypeOptions = false;
  }

  selectStatus(option: string) {
    this.status = option;
    this.showStatusOptions = false;
  }

  toggleAdditionalFields() {
    this.toggleFields = !this.toggleFields;
  }

  async submitTransaction() {
    try {
      // Garantir que `this.price` seja uma string e remover caracteres não numéricos
      const formattedPrice = parseFloat(
        (typeof this.price === 'string'
          ? this.price
          : this.price.toString()
        ).replace(/[^0-9.-]+/g, '')
      );

      const transactionData = {
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        price: formattedPrice,
        listing_date: this.listingDate,
        expiration_date: this.expirationDate,
        acceptance_date: this.acceptanceDate || null,
        closing_date: this.closingDate || null,
        additional_field_1: this.additionalInput1 || null,
        additional_field_2: this.additionalInput2 || null,
        type: this.transactionType, // Corrige o tipo da transação
        status: this.status, // Corrige o status
      };

      await this.transactionService.createTransaction(transactionData);

      // Exibe uma mensagem de sucesso
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Transaction created successfully.',
      });

      // Emite o evento de transação criada
      this.transactionCreated.emit(transactionData);

      // Fecha o modal
      this.closeModal();
    } catch (error) {
      // Tipar o erro como AxiosError
      if (error instanceof AxiosError) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create transaction. Please try again.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An unexpected error occurred. Please try again.',
        });
      }
    }
  }

  closeModal() {
    this.close.emit();
  }
}
