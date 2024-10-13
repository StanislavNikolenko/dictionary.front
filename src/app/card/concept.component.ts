import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

type Word = {
  user: string;
  language: string;
  value: string;
};

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
  ) {}

  ngOnInit() {
    const userId = "66b8bd3ed774a68a42fd372e";
    this.apiService.getAllConcepts(userId).subscribe((concepts) => {
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
