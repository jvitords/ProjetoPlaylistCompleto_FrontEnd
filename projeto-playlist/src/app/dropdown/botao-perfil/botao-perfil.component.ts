import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-perfil',
  standalone: true,
  imports: [NgIf],
  templateUrl: './botao-perfil.component.html',
  styleUrls: ['./botao-perfil.component.css'],
})
export class BotaoPerfilComponent {
  constructor(private authService: AuthService, private router: Router) {}
  menuAberto = false;
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

  abrirMenu() {
    this.menuAberto = !this.menuAberto;
  }

  alterarSenha() {
    this.menuAberto = false;
    this.router.navigate(['/alterar-senha']);
  }
}
