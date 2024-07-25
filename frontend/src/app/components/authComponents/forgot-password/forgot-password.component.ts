import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PasswordResetService } from '../../../services/resetPassword.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  styleUrls: ['./forgot-password.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule, ToastModule],
  providers: [MessageService],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private location: Location,
    private messageService: MessageService
  ) {}

  goBack() {
    this.location.back();
  }

  async requestCode() {
    try {
      await this.passwordResetService.requestPasswordReset(this.email);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Código de redefinição enviado para o email!',
      });
      setTimeout(() => this.router.navigate(['/verify-code']), 2000); // Redireciona após 2 segundos
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail:
          'Erro ao solicitar a redefinição de senha. Verifique o email e tente novamente.',
      });
      console.error('Erro ao solicitar a redefinição de senha', error);
    }
  }
}
