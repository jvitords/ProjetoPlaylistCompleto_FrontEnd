import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../services/music.service';
import { Music } from '../../models/music.model';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent {
  musicList: Music[] = [];
  search: string = '';
  showForm: boolean = false;

  newMusic: Omit<Music, 'id'> = {
    titulo: '',
    artista: '',
    album: '',
    ano: new Date().getFullYear(),
    genero: '',
  };

  // Controle do modal de exclusão
  showConfirmDelete: boolean = false;
  musicIdToDelete: number | null = null;

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.loadMusic();
  }

  loadMusic() {
    this.musicService.getAllOrByName().subscribe((data) => {
      this.musicList = data;
    });
  }

  searchMusic() {
    this.musicService.getAllOrByName(this.search).subscribe((data) => {
      this.musicList = data;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    this.musicService.create(this.newMusic).subscribe(() => {
      this.newMusic = {
        titulo: '',
        artista: '',
        album: '',
        ano: new Date().getFullYear(),
        genero: '',
      };
      this.showForm = false;
      this.loadMusic();
    });
  }

  // Abre modal para confirmar exclusão
  openConfirmDelete(id: number) {
    this.musicIdToDelete = id;
    this.showConfirmDelete = true;
  }

  // Confirma e executa exclusão
  confirmDelete() {
    if (this.musicIdToDelete !== null) {
      this.musicService.delete(this.musicIdToDelete).subscribe(() => {
        this.loadMusic();
        this.cancelDelete();
      });
    }
  }

  // Fecha modal sem excluir
  cancelDelete() {
    this.showConfirmDelete = false;
    this.musicIdToDelete = null;
  }
}
