import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from '../models/music.model';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private baseUrl = 'http://localhost:8080/musica';

  constructor(private http: HttpClient) {}

  getAllOrByName(name?: string): Observable<Music[]> {
    const url = name ? `${this.baseUrl}?name=${name}` : this.baseUrl;
    return this.http.get<Music[]>(url, { withCredentials: true });
  }

  getById(id: number): Observable<Music> {
    return this.http.get<Music>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  create(music: Omit<Music, 'id'>): Observable<Music> {
    return this.http.post<Music>(this.baseUrl, music, {
      withCredentials: true,
    });
  }

  update(titulo: string, music: Omit<Music, 'id'>): Observable<Music> {
    return this.http.put<Music>(`${this.baseUrl}/${titulo}`, music, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
