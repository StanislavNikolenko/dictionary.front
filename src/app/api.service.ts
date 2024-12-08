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
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getAllConcepts(token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    const words = this.http.get<any>(`${this.apiUrl}/concepts/users`, {
      headers,
    });
    return words;
  }

  getUserWords(token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    const words = this.http.get<any>(`${this.apiUrl}/words/user`, {
      headers,
    });
    return words;
  }

  getConceptWords(wordId: string, token: string): Observable<any> {
    console.log("get the word:", wordId);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/words/${wordId}`, {
      headers,
    });
  }

  addNewWord(word: Word, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/words/`, word, { headers });
  }

  removeConcept(conceptId: string, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<any>(`${this.apiUrl}/concepts/${conceptId}`, {
      headers,
    });
  }
}
