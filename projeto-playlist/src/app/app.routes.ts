import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { MusicComponent } from './pages/music/music.component';
import { LayoutComponent } from './layout/layout.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AlterarSenhaComponent } from './dropdown/alterar-senha/alterar-senha.component';

export const routes: Routes = [
  // Redireciona raiz (/) para /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Tela de login
  { path: 'login', component: LoginComponent },

  // Layout com rotas protegidas ou internas
  {
    path: '', // sempre que uma das rotas filhas for chamada, vai carregar a do layout(sidebar)
    component: LayoutComponent, // vai sempre carregar o componente do sidebar junto com uma das rotas acessadas
    children: [
      { path: 'playlist', component: PlaylistComponent },
      { path: 'music', component: MusicComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'alterar-senha', component: AlterarSenhaComponent },
    ],
  },

  // Rota coringa: qualquer caminho inválido vai para login
  { path: '**', redirectTo: 'login' },
];
