import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  username = '';
  password = '';
  roles: string[] = [];

  sucessMessage = '';
  errorMessage = '';

  constructor(private auth: AuthService) {}

  cadastrar() {
    this.errorMessage = '';
    this.auth.register(this.username, this.password, this.roles).subscribe({
      next: () => {
        this.sucessMessage = 'Usuário criado com sucesso!';
        this.errorMessage = '';
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Usuário já registrado';
          this.sucessMessage = '';
        } else if (err.status === 403) {
          this.errorMessage = 'Seu usuário não tem essa permissão';
          this.sucessMessage = '';
        } else {
          this.errorMessage = 'Ocorreu um erro ao registrar';
          this.sucessMessage = '';
        }
      },
    });
  }
}
