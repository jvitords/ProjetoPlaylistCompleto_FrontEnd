import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { MusicComponent } from './pages/music/music.component';
import { LayoutComponent } from './layout/layout.component'; // ajuste o caminho conforme seu projeto

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'playlist', component: PlaylistComponent },
      { path: 'music', component: MusicComponent },
      { path: '', redirectTo: 'music', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];
