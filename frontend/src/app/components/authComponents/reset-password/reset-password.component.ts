import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PasswordResetService } from '../../../services/resetPassword.service'; // Corrigido para o caminho correto
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastModule],
  providers: [MessageService],
})
export class ResetPasswordComponent {
  password: string = '';

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private location: Location,
    private messageService: MessageService
  ) {}

  goBack() {
    this.location.back();
  }

  async resetPassword() {
    try {
      await this.passwordResetService.resetPassword(this.password);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Senha redefinida com sucesso!',
      });
      setTimeout(() => this.router.navigate(['/']), 2000); // Redireciona após 2 segundos
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao redefinir a senha. Tente novamente.',
      });
      console.error('Falha ao redefinir a senha', error);
    }
  }
}
