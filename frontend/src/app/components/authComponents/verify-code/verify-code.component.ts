import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PasswordResetService } from '../../../services/resetpasswor.service'; // Corrigido para o caminho correto
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class VerifyCodeComponent {
  code: string = '';
  message: string = '';

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }
  async verifyCode() {
    try {
      await this.passwordResetService.verifyCode(this.code);
      this.router.navigate(['/reset-password']);
    } catch (error) {
      this.message = 'Código inválido. Tente novamente.';
    }
  }
}
