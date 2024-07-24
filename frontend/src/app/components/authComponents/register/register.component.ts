import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerData = { nome: '', email: '', phone: '', password: '' };
  errors: any = {};
  @Output() toggle = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  onToggle() {
    this.toggle.emit();
  }

  async onRegister() {
    if (!this.validateInputs()) {
      return;
    }

    try {
      console.log(this.registerData);
      const response = await this.authService.register(
        this.registerData.nome,
        this.registerData.email,
        this.registerData.phone,
        this.registerData.password
      );
      console.log('Registro bem-sucedido', response);

      this.router.navigate(['/validate-account']); // Redireciona para a página de login
    } catch (error: any) {
      this.errors.general =
        error.response?.data?.errors?.join(', ') || 'Erro ao fazer registro';
      console.error('Erro ao fazer registro', error);
    }
  }

  validateInputs(): boolean {
    this.errors = {};
    const { nome, email, phone, password } = this.registerData;
    let isValid = true;

    if (!nome || nome.length < 3 || nome.length > 255) {
      this.errors.nome =
        'Campo nome deve ter entre 3 e 255 caracteres e não deve estar vazio';
      isValid = false;
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(nome)) {
      this.errors.nome = 'Nome não deve conter números ou caracteres especiais';
      isValid = false;
    }

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

    if (!phone || phone.length < 10 || phone.length > 15) {
      this.errors.phone =
        'O telefone deve ter entre 10 e 15 caracteres numéricos e não deve estar vazio';
      isValid = false;
    } else {
      const phonePattern = /^\d{10,15}$/;
      if (!phonePattern.test(phone)) {
        this.errors.phone = 'O telefone deve conter apenas números';
        isValid = false;
      }
    }

    if (!password || password.length < 6 || password.length > 50) {
      this.errors.password =
        'A senha precisa ter entre 6 e 50 caracteres e não deve estar vazio';
      isValid = false;
    }

    return isValid;
  }
}
