import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

type Word = {
  user: string,
  language: string,
  value: string,
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})


export class CardComponent {
  concepts: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit() {
    const userId = '66b8bd3ed774a68a42fd372e';
    const concept = 'pencil';
    this.apiService.getAllConcepts(userId, concept).subscribe(concepts => {
      this.concepts = concepts;
      //console.log('concepts:', concepts);
      // concepts.map((concept: any ) => {
      //   console.log('concept:', concept);
      //   return concept;
      // });
    });
  }
  onConceptSelect(conceptName: string) {
    console.log('concept:', conceptName);
    this.router.navigate(['word/details', conceptName]);
  }
}
