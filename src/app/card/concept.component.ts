import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

type Word = {
  user: string;
  language: string;
  value: string;
};

@Component({
  selector: "app-card",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./concept.component.html",
  styleUrl: "./concept.component.css",
})
export class CardComponent {
  concepts: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    const userId = "66b8bd3ed774a68a42fd372e";
    this.apiService.getAllConcepts(userId).subscribe((concepts) => {
      this.concepts = concepts;
    });
  }

  onConceptSelect(conceptName: string) {
    this.router.navigate(["word/details", conceptName]);
  }
}
