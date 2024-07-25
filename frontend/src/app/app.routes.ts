import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgotPasswordComponent } from './components/authComponents/forgot-password/forgot-password.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { AccountValidationComponent } from './components/authComponents/account-validation/account-validation.component';
import { VerifyCodeComponent } from './components/authComponents/verify-code/verify-code.component'; // Adicionado
import { ResetPasswordComponent } from './components/authComponents/reset-password/reset-password.component'; // Adicionado
import { DashboardComponent } from './components/homeComponents/dashboard/dashboard.component';
import { PipelineComponent } from './components/homeComponents/pipeline/pipeline.component';
import { TransactionsComponent } from './components/homeComponents/transactions/transactions.component';
import { BuyerOffersComponent } from './components/homeComponents/buyer-offers/buyer-offers.component';
import { ContactsComponent } from './components/homeComponents/contacts/contacts.component';
import { LibraryComponent } from './components/homeComponents/library/library.component';
import { NotificationsComponent } from './components/homeComponents/notifications/notifications.component';
import { BillingComponent } from './components/homeComponents/billing/billing.component';
import { AddOnsComponent } from './components/homeComponents/add-ons/add-ons.component';
import { ShareEarnComponent } from './components/homeComponents/share-earn/share-earn.component';
import { SignOutComponent } from './components/homeComponents/sign-out/sign-out.component';

const routes: Routes = [
  { path: '', component: LoginRegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pipeline', component: PipelineComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'buyer-offers', component: BuyerOffersComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'add-ons', component: AddOnsComponent },
      { path: 'share-earn', component: ShareEarnComponent },
      { path: 'sign-out', component: SignOutComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-code', component: VerifyCodeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'validate-account', component: AccountValidationComponent },
  { path: 'termsService', component: TermsOfServiceComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export { routes };
