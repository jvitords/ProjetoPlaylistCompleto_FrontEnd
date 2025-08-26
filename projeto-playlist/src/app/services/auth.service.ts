import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    // observable é quem recebe o status do back se foi 200 ou 401
    return this.http.post<AuthResponse>(
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

  register(
    username: string,
    password: string,
    roles: string[] = []
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/register`,
      { username, password, roles },
      { withCredentials: true }
    );
  }
}
