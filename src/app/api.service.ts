import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

type Word = {
  concept: string;
  language: string;
  value: string;
};

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:3000"; // Base URL of your NestJS API

  constructor(private http: HttpClient) {}

  getAllConcepts(token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` }; // Create headers with Bearer token
    const words = this.http.get<any>(`${this.apiUrl}/concepts/users`, { headers }); // Pass headers in the request
    return words;
  }

  getConceptWords(conceptName: string, token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/concepts/${conceptName}`);
  }

  addNewWord(word: Word, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/words/`, word, { headers });
  }

  postSomeData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data);
  }

  removeConcept(conceptId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/concepts/${conceptId}`);
  }
}
