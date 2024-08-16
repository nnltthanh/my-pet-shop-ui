import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-category-card',
  standalone: true,
  imports: [],
  templateUrl: './home-category-card.component.html',
  styleUrl: './home-category-card.component.scss'
})
export class HomeCategoryCardComponent {

  @Input() title!: string;

  @Input() imageSrc!: string;

  @Input() numberOfProducts!: number;
  
}
