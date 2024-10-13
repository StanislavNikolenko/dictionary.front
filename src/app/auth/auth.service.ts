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

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('auth_token');
      this.loggedIn.next(!!token);
    }
  }

  postSomeData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data);
  }

  login(email: string, password: string): Observable<any> {
    console.log('login');
    const data = {
        email: email,
        password: password
    };
    console.log('data', data);
    const url = `${this.apiUrl}/auth/login`;
    console.log('url:', url);
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response: any) => {
        console.log('response', response);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('auth_token', response.access_token);
        }
        this.loggedIn.next(true);
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error); // Propagate the error
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
    }
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getAuthStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
