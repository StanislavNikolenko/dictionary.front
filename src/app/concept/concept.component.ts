import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { languages } from "../data/languages";

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
  showDeleteModal = false;
  conceptToDelete: any = null;
  languages: Language[] = languages;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    this.apiService.getAllConcepts(token!).subscribe((concepts) => {
      this.concepts = concepts;
    });
  }

  onConceptSelect(conceptName: string) {
    this.router.navigate(["word/details", conceptName]);
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
