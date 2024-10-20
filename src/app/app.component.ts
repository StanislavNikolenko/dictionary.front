import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ConceptComponent } from "./concept/concept.component";
import { WordComponent } from "./word/word.component";
import { SpinnerComponent } from "./spinner/spinner.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    ConceptComponent,
    WordComponent,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "dictionary";
}
