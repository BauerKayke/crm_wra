import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../../components/authComponents/login/login.component';
import { RegisterComponent } from '../../components/authComponents/register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent, RouterModule],
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {
  isLogin: boolean = true;

  toggleMode() {
    this.isLogin = !this.isLogin;
  }
}
