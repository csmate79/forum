import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public items: any[] = [
    {
      label: 'Home',
      routerLink: 'home',
    },
    {
      label: 'Admin',
      routerLink: 'admin',
    },
    {
      label: 'Profile',
      routerLink: 'profile',
    },
  ];
}
