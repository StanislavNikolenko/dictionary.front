import { Routes } from "@angular/router";
import { WordComponent } from "./word/word.component";
import { CardComponent } from "./card/concept.component";
import { AddWordComponent } from "./add-word/add-word.component";

export const routes: Routes = [
  { path: "", component: CardComponent },
  { path: "word/details/:conceptName", component: WordComponent },
  { path: "word/create", component: AddWordComponent },
];
