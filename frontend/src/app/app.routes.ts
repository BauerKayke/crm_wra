// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: LoginRegisterComponent }, // Página inicial que mostra o login
  { path: 'home', component: HomeComponent }, // Página inicial após o login
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }, // Página para recuperação de senha
  { path: 'terms-of-service', component: TermsOfServiceComponent }, // Página de termos de serviço
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redireciona qualquer rota não reconhecida para a página inicial
];

export { routes }; // Exportar 'routes' como uma variável nomeada
