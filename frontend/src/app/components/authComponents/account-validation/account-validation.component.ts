import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-account-validation',
  templateUrl: './account-validation.component.html',
  styleUrls: ['./account-validation.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
})
export class AccountValidationComponent {
  validationData = { email: '', code: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private messageService: MessageService
  ) {}

  goBack() {
    this.location.back();
  }

  async onValidate() {
    try {
      const response = await this.authService.validateAccount(
        this.validationData.email,
        this.validationData.code
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Conta validada com sucesso!',
      });
      setTimeout(() => this.router.navigate(['/']), 2000); // Redireciona após 2 segundos
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.errors?.join(', ') || 'Erro ao validar conta';
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: errorMsg,
      });
      console.error('Erro ao validar conta', error);
    }
  }
}
