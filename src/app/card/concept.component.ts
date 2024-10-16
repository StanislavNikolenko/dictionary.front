import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./concept.component.html",
  styleUrl: "./concept.component.css",
})

export class ConceptComponent {
  concepts: any[] = [];
  showDeleteModal = false;
  conceptToDelete: any = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
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
      this.onDeleteConcept(this.conceptToDelete._id).subscribe({
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
    // This will reload the current route
    window.location.reload();
  }

  cancelDelete() {
    this.closeModal();
  }

  closeModal() {
    this.showDeleteModal = false;
    this.conceptToDelete = null;
  }

  onDeleteConcept(conceptId: string) {
    return this.apiService.removeConcept(conceptId);
  }
}
