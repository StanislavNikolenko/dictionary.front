import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { ApiService } from "../api.service";
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: "add-word",
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, SpinnerComponent],
  templateUrl: "./add-word.component.html",
  styleUrl: "./add-word.component.css",
})
export class AddWordComponent {
  addWordForm = new FormGroup({
    wordValue: new FormControl(""),
    wordLanguage: new FormControl(""),
    wordTranslation: new FormControl(""),
  });
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  addWord() {
    const newWord = {
      concept: String(
        this.addWordForm.value.wordTranslation ?? "",
      ).toLocaleLowerCase(),
      language: String(
        this.addWordForm.value.wordLanguage ?? "",
      ).toLocaleLowerCase(),
      value: String(this.addWordForm.value.wordValue ?? "").toLocaleLowerCase(),
      translation: String(
        this.addWordForm.value.wordTranslation ?? "",
      ).toLocaleLowerCase(),
    };
    const token = localStorage.getItem("auth_token");
    this.isLoading = true;
    this.apiService.addNewWord(newWord, token!).subscribe(
      (response) => {
        this.addWordForm.reset();
        alert("New word has been created successfully!");
        this.isLoading = false;
      },
      (error) => {
        console.error("Error:", error);
        alert("An error occurred while creating the word.");
        this.isLoading = false; // Hide the spinner
      },
    );
  }
}
