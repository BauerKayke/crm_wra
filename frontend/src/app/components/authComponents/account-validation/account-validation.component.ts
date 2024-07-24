import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-validation',
  templateUrl: './account-validation.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./account-validation.component.scss'],
})
export class AccountValidationComponent {
  validationData = { email: '', code: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onValidate() {
    try {
      const response = await this.authService.validateAccount(
        this.validationData.email,
        this.validationData.code
      );
      this.successMessage = response.data;
      setTimeout(() => this.router.navigate(['/']), 2000); // Redireciona após 2 segundos
    } catch (error: any) {
      this.errorMessage =
        error.response?.data?.errors?.join(', ') || 'Erro ao validar conta';
      console.error('Erro ao validar conta', error);
    }
  }
}
