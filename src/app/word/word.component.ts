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
  conceptName: string = "";
  words: [] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    this.conceptName = String(this.route.snapshot.paramMap.get("conceptName"));
    this.apiService
      .getConceptWords(this.conceptName, token!)
      .subscribe((words) => (this.words = words));
  }
}
