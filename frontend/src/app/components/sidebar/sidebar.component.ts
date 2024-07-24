import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentPage: string = '';

  overviewItems = [
    { label: 'Dashboard', link: '/dashboard', page: 'dashboard' },
    { label: 'Pipeline', link: '/pipeline', page: 'pipeline' },
    { label: 'Transactions', link: '/transactions', page: 'transactions' },
    { label: 'Buyer offers', link: '/buyer-offers', page: 'buyer-offers' },
    { label: 'Contacts', link: '/contacts', page: 'contacts' },
    { label: 'Library', link: '/library', page: 'library' },
  ];

  todoItems = [
    { label: 'Dashboard', link: '/todo-dashboard', page: 'todo-dashboard' },
    { label: 'Pipeline', link: '/todo-pipeline', page: 'todo-pipeline' },
    {
      label: 'Transactions',
      link: '/todo-transactions',
      page: 'todo-transactions',
    },
    {
      label: 'Buyer offers',
      link: '/todo-buyer-offers',
      page: 'todo-buyer-offers',
    },
    { label: 'Contacts', link: '/todo-contacts', page: 'todo-contacts' },
    { label: 'Library', link: '/todo-library', page: 'todo-library' },
  ];

  userItems = [
    { label: 'Notifications', link: '/notifications', page: 'notifications' },
    { label: 'Billing', link: '/billing', page: 'billing' },
    { label: 'Add-ons', link: '/addons', page: 'addons' },
    { label: 'Share & earn cash', link: '/share-earn', page: 'share-earn' },
    { label: 'Sign out', link: '/sign-out', page: 'sign-out' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.urlAfterRedirects.split('/').pop() || '';
      }
    });
  }
}
