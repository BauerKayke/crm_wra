import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PasswordResetService } from '../../../services/resetpasswor.service'; // Corrigido para o caminho correto
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ResetPasswordComponent {
  password: string = '';
  message: string = '';

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }
  async resetPassword() {
    try {
      await this.passwordResetService.resetPassword(this.password);
      this.router.navigate(['/']);
    } catch (error) {
      this.message = 'Falha ao redefinir a senha. Tente novamente.';
    }
  }
}
