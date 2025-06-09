import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/playlist']); // ajustar pra rota da playlist depois
      },
      error: (err) => {
        this.errorMessage = 'Usuário ou senha inválidos';
        console.error(err);
      },
    });
  }
}
