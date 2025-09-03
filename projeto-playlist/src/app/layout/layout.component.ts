import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BotaoPerfilComponent } from '../dropdown/botao-perfil/botao-perfil.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, BotaoPerfilComponent, NgIf],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  username: string = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (res) => {
        this.username = res.username;
        this.roles = res.roles;
        console.log('ROLES RECEBIDAS: ', this.roles);
      },
      error: () => {
        this.username = 'null';
      },
    });
  }

  isAdmin(): boolean {
    const result = this.roles.includes('ADMIN');
    console.log('isAdmin chamado:', this.roles, '=>', result);
    return result;
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no logout', err);
      },
    });
  }
}
