import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SidebarService } from '../../../services/sideBar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  currentPage: string = '';
  hovered: string = '';
  isSidebarCollapsed: boolean = false;
  private sidebarCollapsed = new BehaviorSubject<boolean>(false);
  sidebarCollapsed$ = this.sidebarCollapsed.asObservable();

  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.urlAfterRedirects;
      }
    });
  }
  setSidebarCollapsed(collapsed: boolean) {
    this.sidebarCollapsed.next(collapsed);
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarService.setSidebarCollapsed(this.isSidebarCollapsed); // Atualize o serviço com o novo estado
  }

  isActive(route: string): boolean {
    return this.currentPage.startsWith(route);
  }

  isHovered(route: string): boolean {
    return this.hovered === route;
  }

  setHovered(route: string): void {
    this.hovered = route;
  }

  clearHovered(): void {
    this.hovered = '';
  }
}
