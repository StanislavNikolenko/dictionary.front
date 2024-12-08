import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterOutlet, RouterLink } from "@angular/router";
import { ApiService } from "../api.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "word",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./word.component.html",
  styleUrl: "./word.component.css",
})
export class WordComponent {
  word: string = "";

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    const wordId = String(this.route.snapshot.paramMap.get("wordId"));
    this.apiService.getConceptWords(wordId, token!).subscribe((data) => {
      this.word = data.value;
    });
  }
}
