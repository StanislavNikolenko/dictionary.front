import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import { ApiService } from "../api.service";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectChange } from '@angular/material/select';
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { languages } from "../data/languages";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { WordModalComponent } from '../word-modal/word-modal.component';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: "app-card",
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: "./concept.component.html",
  styleUrl: "./concept.component.css",
})
export class ConceptComponent {
  concepts: any[] = [];
  allUserwords: any[] = [];
  wordsToDisplay: any[] = [];
  showDeleteModal = false;
  conceptToDelete: any = null;
  languages: Language[] = languages;
  currentLanguage = 'Armenian';

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    this.apiService.getUserWords(token!).subscribe((userWords) => {
      this.allUserwords = userWords;
      this.allUserwords.forEach((word:any) => {
          if(word.language === this.currentLanguage) {
            this.wordsToDisplay.push(word);
          };
      });
    });
  }

  openDialog(word: any): void {
    console.log('open dialog word:', word);
    const dialogRef = this.dialog.open(WordModalComponent, {
      data: { wordId: word._id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }

  onLanguageChange(event: any) {
    this.currentLanguage = event.value;
    this.updateDisplayedItems();
  }

  updateDisplayedItems() {
    const newWords:any = [];
    this.allUserwords.forEach((word: any) => {
      if(word.language === this.currentLanguage) {
        newWords.push(word);
      };
    });
    this.wordsToDisplay = newWords;
  }

  onConceptSelect(wordId: string) {
    this.router.navigate(["word/details", wordId]);
  }

  openDeleteModal(concept: any) {
    this.showDeleteModal = true;
    this.conceptToDelete = concept;
  }

  confirmDelete() {
    if (this.conceptToDelete) {
      const token = this.authService.getToken();
      this.onDeleteConcept(this.conceptToDelete._id, token!).subscribe({
        next: () => {
          this.closeModal();
          this.refreshPage();
        },
        error: (error) => {
          console.error("Error deleting concept:", error);
        },
      });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  cancelDelete() {
    this.closeModal();
  }

  closeModal() {
    this.showDeleteModal = false;
    this.conceptToDelete = null;
  }

  onDeleteConcept(conceptId: string, token: string) {
    return this.apiService.removeConcept(conceptId, token);
  }

  onLogout() {
    this.authService.logout();
    this.refreshPage();
  }
}
