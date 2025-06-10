import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { MusicComponent } from './pages/music/music.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // Redireciona raiz (/) para /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Tela de login
  { path: 'login', component: LoginComponent },

  // Layout com rotas protegidas ou internas
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'playlist', component: PlaylistComponent },
      { path: 'music', component: MusicComponent },
    ],
  },

  // Rota coringa: qualquer caminho inválido vai para login
  { path: '**', redirectTo: 'login' },
];
