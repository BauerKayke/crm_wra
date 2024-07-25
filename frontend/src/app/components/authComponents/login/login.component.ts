import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastModule],
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginData = { email: '', password: '', rememberMe: false };
  @Output() toggle = new EventEmitter<void>();
  errorMessage = '';
  errors: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    const userInfo = await this.authService.getUserInfo();
    if (userInfo && userInfo.email) {
      this.loginData.email = userInfo.email;
    }
  }

  onToggle() {
    this.toggle.emit();
  }

  async onLogin() {
    if (!this.validateInputs()) {
      return;
    }

    try {
      const response = await this.authService.login(
        this.loginData.email,
        this.loginData.password,
        this.loginData.rememberMe
      );

      if (response && response.token) {
        this.showSuccess('Login realizado com sucesso');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000); // Atraso de 2 segundos
      } else {
        this.showError('Erro ao fazer login');
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.errors?.join(', ') || 'Erro ao fazer login';
      this.showError(errorMsg);
      console.error('Erro ao fazer login', error);
    }
  }

  validateInputs(): boolean {
    this.errors = {};
    const { email, password } = this.loginData;
    let isValid = true;

    if (!email) {
      this.errors.email = 'Campo email não pode estar vazio';
      isValid = false;
    } else {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailPattern.test(email)) {
        this.errors.email = 'Email inválido';
        isValid = false;
      }
    }

    if (!password || password.length < 6 || password.length > 50) {
      this.errors.password =
        'A senha precisa ter entre 6 e 50 caracteres e não deve estar vazia';
      isValid = false;
    }

    return isValid;
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
}
