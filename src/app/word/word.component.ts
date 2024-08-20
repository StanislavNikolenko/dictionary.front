import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
  selector: "word",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./word.component.html",
  styleUrl: "./word.component.css",
})
export class WordComponent {
  conceptName: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log("word component");
    this.conceptName = this.route.snapshot.paramMap.get("conceptName");
    console.log("Concept Name:", this.conceptName);
    // this.apiService.getAllConcepts(userId, concept).subscribe(concepts => {
    //   this.concepts = concepts;
    //   //console.log('concepts:', concepts);
    // concepts.map((concept: any ) => {
    //   console.log('concept:', concept);
    //   return concept;
    // });
    // });
  }
}
