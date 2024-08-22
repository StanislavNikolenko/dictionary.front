import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:3000"; // Base URL of your NestJS API

  constructor(private http: HttpClient) {}

  getAllConcepts(userId: string): Observable<any> {
    const words = this.http.get<any>(`${this.apiUrl}/concepts/users/${userId}`);
    return words;
  }

  getConceptWords(conceptName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/concepts/${conceptName}`);
  }

  postSomeData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data);
  }
}
