import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterOutlet, RouterLink } from "@angular/router";
import { ApiService } from "../api.service";

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
  ) {}

  ngOnInit() {
    this.conceptName = String(this.route.snapshot.paramMap.get("conceptName"));
    this.apiService
      .getConceptWords(this.conceptName)
      .subscribe((words) => (this.words = words));
  }
}
