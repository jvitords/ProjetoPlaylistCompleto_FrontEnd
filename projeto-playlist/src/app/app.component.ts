import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <header>
      <h1>Projeto Playlist</h1>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
