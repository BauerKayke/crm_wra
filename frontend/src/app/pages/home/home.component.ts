import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sideBar.service'; // Certifique-se de importar o serviço correto
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/homeComponents/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
})
export class HomeComponent implements OnInit {
  isSidebarCollapsed: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: SidebarService // Injete o serviço SidebarService
  ) {}

  async ngOnInit() {
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/']);
    }

    this.sidebarService.sidebarCollapsed$.subscribe(
      (collapsed) => (this.isSidebarCollapsed = collapsed)
    );
  }
}
