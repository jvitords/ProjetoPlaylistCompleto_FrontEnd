import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // ajuste se precisar

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/login`,
      { username, password },
      { withCredentials: true }
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
