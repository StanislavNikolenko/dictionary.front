import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { CardComponent } from "./card/card.component";
import { WordComponent } from "./word/word.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CardComponent, WordComponent, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "dictionary";
}
