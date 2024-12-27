import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, { name, email, password });
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  getUserId(): number | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  }

}
