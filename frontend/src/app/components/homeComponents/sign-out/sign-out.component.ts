import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss',
})
export class SignOutComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/home']);
  }

  confirmSignOut() {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Redireciona para a tela de login
    this.router.navigate(['/']);
  }
}
