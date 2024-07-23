import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  @Output() toggle = new EventEmitter<void>();
  constructor(private router: Router, private authService: AuthService) {}

  onToggle() {
    this.toggle.emit();
  }
  async onLogin() {
    try {
      console.log(this.loginData);
      const response = await this.authService.login(
        this.loginData.email,
        this.loginData.password
      );
      console.log('Login bem-sucedido', response);
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  }
}
