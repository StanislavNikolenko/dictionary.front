import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../api.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-word-modal',
  standalone: true,
  imports: [],
  templateUrl: './word-modal.component.html',
  styleUrl: './word-modal.component.css'
})

export class WordModalComponent {
  word: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { wordId: string },
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    console.log('data wordId:', this.data.wordId);
    const wordId = this.data.wordId;
    this.apiService
      .getConceptWords(wordId, token!)
      .subscribe((data) => {
        this.word = data.value;
      });
  }
}