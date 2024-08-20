import { Routes } from "@angular/router";
import { WordComponent } from "./word/word.component";
import { CardComponent } from "./card/card.component";

export const routes: Routes = [
  { path: "", component: CardComponent },
  { path: "word/details/:conceptName", component: WordComponent },
];
