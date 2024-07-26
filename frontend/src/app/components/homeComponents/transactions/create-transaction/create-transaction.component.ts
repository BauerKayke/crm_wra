import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
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
  providers: [MessageService],
})
export class CreateTransactionComponent implements AfterViewInit {
  @Input() transaction: any;
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
  price = '';
  listingDate = '';
  expirationDate = '';
  acceptanceDate = '';
  closingDate = '';

  additionalFields: { [key: string]: any } = {
    mls: '',
    leadSource: '',
  };

  transactionTypes = [
    'Residential Sale',
    'Commercial Sale',
    'Rent/lease',
    'Vacant land',
    'Commercial lease',
    'Business',
    'Other',
    'Referral',
    'House sale',
    'House sale other',
  ];
  statusOptions = ['Listing', 'Pre-listing', 'Pending'];
  toggleFields = false;
  errorMsg = '';
  isProcessing = false;

  constructor(
    private addressService: AddressService,
    private transactionService: TransactionService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (this.transaction) {
      this.address = this.transaction.address || '';
      this.city = this.transaction.city || '';
      this.state = this.transaction.state || '';
      this.zip = this.transaction.zip || '';
      this.price = this.formatPrice(this.transaction.price || '');
      this.listingDate = this.transaction.listing_date || '';
      this.expirationDate = this.transaction.expiration_date || '';
      this.acceptanceDate = this.transaction.acceptance_date || '';
      this.closingDate = this.transaction.closing_date || '';
      this.additionalFields = this.transaction.additional_fields || {};
      this.transactionType = this.transaction.type || 'Residential Sale';
      this.status = this.transaction.status || 'Listing';
    }
  }

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

  formatPrice(price: any): string {
    if (price === undefined || price === null) {
      return '';
    }

    return price.toString().replace(/[^0-9.-]+/g, '');
  }

  onPriceChange(value: string) {
    this.price = value;
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

  private getTransactionData(): any {
    const formattedPrice = parseFloat(
      this.price.replace(/[^0-9.-]+/g, '') || '0'
    );

    return {
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      price: formattedPrice,
      listing_date: this.listingDate,
      expiration_date: this.expirationDate,
      acceptance_date: this.acceptanceDate || null,
      closing_date: this.closingDate || null,
      additional_fields: this.additionalFields,
      type: this.transactionType,
      status: this.status,
    };
  }

  private async createTransaction(transactionData: any) {
    try {
      this.isProcessing = true;
      await this.transactionService.createTransaction(transactionData);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Transaction created successfully.',
      });
      this.transactionCreated.emit(transactionData);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isProcessing = false; // Desmarca após o processamento
    }
  }

  private async updateTransaction(transactionData: any) {
    try {
      this.isProcessing = true;
      await this.transactionService.updateTransaction(
        this.transaction.id,
        transactionData
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Transaction updated successfully.',
      });
      this.transactionCreated.emit(transactionData);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isProcessing = false; // Desmarca após o processamento
    }
  }

  async submitTransaction() {
    if (this.isProcessing) {
      console.log('Transaction is already being processed.');
      return; // Retorna se já estiver processando
    }
    const transactionData = this.getTransactionData();

    if (this.transaction) {
      await this.updateTransaction(transactionData);
    } else {
      await this.createTransaction(transactionData);
    }

    this.closeModal();
  }

  private handleError(error: any) {
    if (error instanceof AxiosError) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save transaction. Please try again.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
