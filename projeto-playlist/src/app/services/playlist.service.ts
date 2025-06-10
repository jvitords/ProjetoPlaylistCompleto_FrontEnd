import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from '../models/music.model';

export interface Playlist {
  id: number;
  nome: string;
  descricao: string;
  musicas?: Music[];
}

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private baseUrl = 'http://localhost:8080/lists';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.baseUrl, { withCredentials: true });
  }

  getPlaylistByName(nome: string): Observable<Playlist> {
    return this.http.get<Playlist>(
      `${this.baseUrl}/${encodeURIComponent(nome)}`,
      {
        withCredentials: true,
      }
    );
  }

  create(playlist: Partial<Playlist>): Observable<Playlist> {
    return this.http.post<Playlist>(this.baseUrl, playlist, {
      withCredentials: true,
    });
  }

  update(nome: string, playlist: Partial<Playlist>): Observable<Playlist> {
    return this.http.put<Playlist>(
      `${this.baseUrl}/${encodeURIComponent(nome)}`,
      playlist,
      {
        withCredentials: true,
      }
    );
  }

  delete(nome: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${encodeURIComponent(nome)}`,
      {
        withCredentials: true,
      }
    );
  }

  addMusicToPlaylist(
    nomePlaylist: string,
    nomeMusic: string
  ): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${encodeURIComponent(
        nomePlaylist
      )}/music/${encodeURIComponent(nomeMusic)}`,
      null,
      { withCredentials: true }
    );
  }

  removeMusicFromPlaylist(
    nomePlaylist: string,
    nomeMusic: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${encodeURIComponent(
        nomePlaylist
      )}/music/${encodeURIComponent(nomeMusic)}`,
      { withCredentials: true }
    );
  }
}
