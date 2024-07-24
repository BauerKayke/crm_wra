import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PasswordResetService } from '../../../services/resetpasswor.service';
import { CommonModule, Location } from '@angular/common'; // Corrigido para o caminho correto
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  styleUrls: ['./forgot-password.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }
  async requestCode() {
    try {
      await this.passwordResetService.requestPasswordReset(this.email);
      this.router.navigate(['/verify-code']);
    } catch (error) {
      this.message =
        'Erro ao solicitar a redefinição de senha. Verifique o email e tente novamente.';
    }
  }
}
