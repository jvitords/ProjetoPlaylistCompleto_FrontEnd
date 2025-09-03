import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // precisa para ngModel
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css'],
})
export class AlterarSenhaComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (res) => {
        this.username = res.username;
      },
      error: () => {
        this.username = 'null';
      },
    });
  }

  redefinirSenha(): void {
    this.authService.alterarSenha(this.password).subscribe({
      next: (res) => {
        console.log('Senha alterada com sucesso:', res.message);
        this.authService.logout().subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Erro ao fazer logout:', err);
          },
        });
      },
      error: (err) => {
        console.error('Erro ao alterar senha:', err);
      },
    });
  }
}
