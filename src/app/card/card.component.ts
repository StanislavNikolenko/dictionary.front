import { Component } from '@angular/core';
import { ApiService } from '../api.service';

type Word = {
  user: string,
  language: string,
  value: string,
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    const userId = '66b8bd3ed774a68a42fd372e';
    const concept = 'pencil';
    this.apiService.getAllConcepts(userId, concept).subscribe(concepts => {
      concepts.map((concept: any ) => {
        console.log('concept:', concept);
        return concept;
      });
    });
  }
}
