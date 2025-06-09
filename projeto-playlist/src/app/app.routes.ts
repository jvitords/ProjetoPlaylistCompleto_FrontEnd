import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { MusicComponent } from './pages/music/music.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'music', component: MusicComponent },
  { path: '**', redirectTo: 'login' },
];
