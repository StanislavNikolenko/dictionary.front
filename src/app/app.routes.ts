import { Routes } from "@angular/router";
import { WordComponent } from "./word/word.component";
import { ConceptComponent } from "./concept/concept.component";
import { AddWordComponent } from "./add-word/add-word.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "", component: ConceptComponent, canActivate: [AuthGuard] }, 
  { path: "auth", component: AuthComponent },
  { path: "word/details/:conceptName", component: WordComponent, canActivate: [AuthGuard] },
  { path: "word/create", component: AddWordComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "auth" }
];
