import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { CardComponent } from "./card/concept.component";
import { WordComponent } from "./word/word.component";
import { SpinnerComponent } from "./spinner/spinner.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    CardComponent,
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
