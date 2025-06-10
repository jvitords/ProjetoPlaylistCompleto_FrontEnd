import { Component, OnInit } from '@angular/core';
import { PlaylistService, Playlist } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Music } from '../../models/music.model';
import { MusicService } from '../../services/music.service';

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
  playlistMusics: { [playlistName: string]: string[] } = {};
  isAdding = false;
  newNome = '';
  newDescricao = '';
  isEditing = false;
  playlistBeingEdited: Playlist | null = null;
  editedNome = '';
  editedDescricao = '';
  showConfirmDelete = false;
  playlistToDelete: string | null = null;
  nomePlaylist = 'MinhaPlaylist';
  musicasDisponiveis: Music[] = [];
  mostrarModal = false;
  playlistSelecionada: Playlist | null = null;
  musicasDaPlaylist: Music[] = [];
  mostrarModalPlaylist = false;

  constructor(
    private playlistService: PlaylistService,
    private musicaService: MusicService
  ) {}

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
    this.isAdding = true;
    this.newNome = '';
    this.newDescricao = '';
  }

  saveNewPlaylist() {
    if (!this.newNome.trim()) {
      alert('O nome da playlist é obrigatório.');
      return;
    }

    const newPlaylist: Partial<Playlist> = {
      nome: this.newNome.trim(),
      descricao: this.newDescricao.trim(),
    };

    this.playlistService.create(newPlaylist).subscribe({
      next: () => {
        this.isAdding = false;
        this.loadPlaylists();
      },
      error: (err) => {
        console.error('Erro ao adicionar playlist', err);
      },
    });
  }

  cancelAdd() {
    this.isAdding = false;
  }

  openEditPlaylist(playlist: Playlist) {
    this.isEditing = true;
    this.playlistBeingEdited = playlist;
    this.editedNome = playlist.nome;
    this.editedDescricao = playlist.descricao;
  }

  saveEdit() {
    if (!this.playlistBeingEdited) return;

    const updatedData: Partial<Playlist> = {
      nome: this.editedNome,
      descricao: this.editedDescricao,
    };

    this.playlistService
      .update(this.playlistBeingEdited.nome, updatedData)
      .subscribe({
        next: (updatedPlaylist) => {
          this.isEditing = false;
          this.playlistBeingEdited = null;
          this.loadPlaylists();
        },
        error: (err) => {
          console.error('Erro ao atualizar playlist', err);
        },
      });
  }

  cancelEdit() {
    this.isEditing = false;
    this.playlistBeingEdited = null;
  }

  confirmDelete(nome: string) {
    this.playlistToDelete = nome;
    this.showConfirmDelete = true;
  }

  deletePlaylist() {
    if (!this.playlistToDelete) return;

    this.playlistService.delete(this.playlistToDelete).subscribe({
      next: () => {
        this.loadPlaylists();
        this.cancelDelete();
      },
      error: (err) => console.error('Erro ao excluir playlist', err),
    });
  }

  cancelDelete() {
    this.showConfirmDelete = false;
    this.playlistToDelete = null;
  }

  abrirModal() {
    this.musicaService.getAllOrByName().subscribe({
      next: (musicas) => {
        this.musicasDisponiveis = musicas;
        this.mostrarModal = true;
      },
      error: () => alert('Erro ao buscar músicas.'),
    });
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  adicionarMusica(nomeMusica: string) {
    this.playlistService
      .addMusicToPlaylist(this.nomePlaylist, nomeMusica)
      .subscribe({
        next: () => this.fecharModal(),
        error: () => alert('Erro ao adicionar música.'),
      });
  }

  abrirPlaylist(playlist: Playlist) {
    this.playlistService.getPlaylistByName(playlist.nome).subscribe({
      next: (playlistCompleta) => {
        this.playlistSelecionada = playlistCompleta;
        this.musicasDaPlaylist = playlistCompleta.musicas || [];
      },
      error: (err) => {
        console.error('Erro ao carregar playlist completa', err);
        this.playlistSelecionada = null;
        this.musicasDaPlaylist = [];
      },
    });
  }

  removeMusic(nomePlaylist: string, nomeMusic: string) {
    this.playlistService
      .removeMusicFromPlaylist(nomePlaylist, nomeMusic)
      .subscribe({
        next: () => {
          this.musicasDaPlaylist = this.musicasDaPlaylist.filter(
            (musica) => musica.titulo !== nomeMusic
          );
        },
        error: (err) => console.error('Erro ao excluir música:', err),
      });
  }
}
