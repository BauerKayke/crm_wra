import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PasswordResetService } from '../../../services/resetPassword.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastModule],
  providers: [MessageService],
})
export class VerifyCodeComponent {
  code: string = '';
  message: string = '';

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private location: Location,
    private messageService: MessageService
  ) {}

  goBack() {
    this.clearHistory();
    this.router.navigate(['/forgot-password'], { replaceUrl: true });
  }

  async verifyCode() {
    try {
      await this.passwordResetService.verifyCode(this.code);
      this.showSuccess('Código verificado com sucesso!');
      setTimeout(() => {
        this.clearHistory();
        this.router.navigate(['/reset-password'], { replaceUrl: true });
      }, 2000); // Atraso de 2 segundos
    } catch (error) {
      const errorMessage = this.extractErrorMessage(error);
      this.showError(errorMessage);

      const attempts = sessionStorage.getItem('attempts');
      if (attempts && parseInt(attempts, 10) >= 2) {
        // Máximo de tentativas alcançado
        this.showError(
          'Número máximo de tentativas alcançado. Por favor, gere um novo código.'
        );
        setTimeout(() => {
          this.router
            .navigate(['/forgot-password'], { replaceUrl: true })
            .then(() => {
              this.clearHistory();
            });
        }, 2000); // Atraso de 2 segundos
      }
    }
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
    });
  }

  private clearHistory() {
    history.pushState(null, '', location.href); // Adiciona uma nova entrada no histórico
    history.back(); // Volta uma entrada no histórico
    history.forward(); // Avança para a entrada adicionada
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'Ocorreu um erro desconhecido.';
    }
  }
}
