import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const isAuthenticated = await this.authService.isAuthenticated();
    console.log('Is Authenticated:', isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/']);
    }
  }
}
