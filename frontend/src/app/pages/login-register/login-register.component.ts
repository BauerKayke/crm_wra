import { CommonModule } from '@angular/common';
import { Component, Provider } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {
  isLogin: boolean = true;

  toggleMode() {
    this.isLogin = !this.isLogin;
  }
}
