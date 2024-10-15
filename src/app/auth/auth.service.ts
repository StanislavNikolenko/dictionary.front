import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = "http://localhost:3000";
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = this.getToken();
      this.loggedIn.next(!!token);
    }
  }

  postSomeData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data);
  }

  login(email: string, password: string): Observable<any> {
    const data = {
        email: email,
        password: password
    };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response: any) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          this.setToken(response.access_token);
        }
        this.loggedIn.next(true);
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error); // Propagate the error
      })
    );
  }

  signup(email: string, password: string, username: string): Observable<any> {
    const data = {
        name: username,
        email: email,
        password: password
    };
    return this.http.post<any>(`${this.apiUrl}/users`, data).pipe(
      tap((response: any) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          this.setToken(response.access_token);
        }
        this.loggedIn.next(true);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.clearToken();
    }
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getAuthStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
