import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app-container">
      <nav class="sidebar">
        <ul>
          <li>
            <a routerLink="/playlist" routerLinkActive="active">Playlists</a>
          </li>
          <li><a routerLink="/music" routerLinkActive="active">Músicas</a></li>
          <li><a href="#" (click)="onLogout($event)">Logout</a></li>
        </ul>
      </nav>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        height: 100vh;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .sidebar {
        width: 220px;
        background: #0d6efd;
        color: white;
        padding-top: 1.5rem;
        display: flex;
        flex-direction: column;
        position: relative; /* <<< importante */
      }
      .sidebar ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        overflow-y: auto; /* se a lista crescer, rola */
        padding-bottom: 56px; /* reserva espaço pro botão fixado (ajuste se preciso) */
      }
      .sidebar li {
        margin: 0;
      }
      .sidebar a {
        display: block;
        padding: 12px 20px;
        color: white;
        text-decoration: none;
        font-weight: 600;
        transition: background-color 0.2s;
        cursor: pointer;
      }
      .sidebar a:hover,
      .sidebar a.active {
        background-color: #084298;
      }
      .sidebar li:last-child a {
        color: #de2134ff;
        background-color: transparent;
      }

      .sidebar li:last-child a:hover {
        color: #a71d2a;
        background-color: transparent;
      }

      .sidebar li:last-child {
        position: absolute; /* tira do fluxo e fixa */
        left: 0;
        right: 0;
        bottom: 0; /* cola no fim do nav */
        margin: 0;
      }

      .main-content {
        flex-grow: 1;
        padding: 20px;
        background-color: #f8f9fa;
        overflow-y: auto;
      }
    `,
  ],
})
export class LayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout realizado, navegando para login...');
        this.router.navigate(['/login']); // redireciona para login
      },
      error: (err) => {
        console.error('Erro no logout', err);
      },
    });
  }
}
