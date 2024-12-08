import { Component, Inject, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-word-modal",
  standalone: true,
  imports: [],
  templateUrl: "./word-modal.component.html",
  styleUrl: "./word-modal.component.css",
})
export class WordModalComponent {
  name: string = "";
  translation: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { wordId: string; translation: string; name: string },
  ) {}

  ngOnInit() {
    this.translation = this.data.translation;
    this.name = this.data.name;
  }

  readonly dialogRef = inject(MatDialogRef<WordModalComponent>);
  // readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
