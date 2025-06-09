import { Component, OnInit } from '@angular/core';
import { PlaylistService, Playlist } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  filteredPlaylists: Playlist[] = [];
  searchTerm = '';
  selectedPlaylist: Playlist | null = null;
  showMusicList = false;
  availableMusics: string[] = []; // nomes das músicas
  selectedMusicToAdd = '';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    this.playlistService.getAll().subscribe({
      next: (data) => {
        this.playlists = data;
        this.filteredPlaylists = data;
      },
      error: (err) => {
        console.error('Erro ao carregar playlists', err);
      },
    });
  }

  filterPlaylists() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPlaylists = this.playlists.filter((p) =>
      p.nome.toLowerCase().includes(term)
    );
  }

  openAddPlaylist() {
    // abrir modal ou redirecionar para página de criação
    alert('Abrir tela para adicionar playlist');
  }

  openEditPlaylist(playlist: Playlist) {
    // abrir modal ou redirecionar para edição
    alert(`Editar playlist: ${playlist.nome}`);
  }

  openAddMusic(playlist: Playlist) {
    this.selectedPlaylist = playlist;
    this.showMusicList = true;

    // TODO: Substituir pela busca real na API de músicas
    this.availableMusics = ['Música 1', 'Música 2', 'Música 3'];
  }

  deletePlaylist(nome: string) {
    if (confirm('Tem certeza que deseja excluir essa playlist?')) {
      this.playlistService.delete(nome).subscribe({
        next: () => {
          this.loadPlaylists();
        },
        error: (err) => {
          console.error('Erro ao excluir playlist', err);
        },
      });
    }
  }
  addMusicToPlaylist(nomePlaylist: string, nomeMusic: string) {
    this.playlistService.addMusicToPlaylist(nomePlaylist, nomeMusic).subscribe({
      next: () => {
        alert(`Música "${nomeMusic}" adicionada à playlist "${nomePlaylist}"`);
        this.selectedMusicToAdd = '';
        this.showMusicList = false;
        this.selectedPlaylist = null;
        // se quiser, pode recarregar as playlists aqui
      },
      error: (err) => {
        console.error('Erro ao adicionar música', err);
      },
    });
  }
}
