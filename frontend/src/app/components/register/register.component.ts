import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerData = { name: '', email: '', phone: '', password: '' };
  errorMessage = '';
  @Output() toggle = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  onToggle() {
    this.toggle.emit();
  }
  async onRegister() {
    try {
      console.log(this.registerData);
      const response = await this.authService.register(
        this.registerData.name,
        this.registerData.email,
        this.registerData.phone,
        this.registerData.password
      );
      console.log('Registro bem-sucedido', response);
    } catch (error: any) {
      this.errorMessage =
        error.response?.data?.errors?.join(', ') || 'Erro ao fazer registro';
      console.error('Erro ao fazer registro', error);
    }
  }
}
