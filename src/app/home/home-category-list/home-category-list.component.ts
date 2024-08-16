import { Component, OnInit } from '@angular/core';
import { HomeCategoryCardComponent } from './home-category-card/home-category-card.component';

@Component({
  selector: 'app-home-category-list',
  standalone: true,
  imports: [HomeCategoryCardComponent],
  templateUrl: './home-category-list.component.html',
  styleUrl: './home-category-list.component.scss'
})
export class HomeCategoryListComponent implements OnInit {

  categories?: {
    title: string,
    image: string,
    numberOfProducts: number
  }[];

  ngOnInit(): void {
    this.categories = [
      {
        title: "Phụ kiện thú cưng",
        image: "assets/categories/accessory-category.jpg",
        numberOfProducts: 15
      },
      {
        title: "Thức ăn thú cưng",
        image: "assets/categories/food-category.jpg",
        numberOfProducts: 25
      },
      {
        title: "Chó",
        image: "assets/categories/dog-category.jpeg",
        numberOfProducts: 35
      },
      {
        title: "Mèo",
        image: "/assets/categories/cat-category.jpg",
        numberOfProducts: 45
      },
      {
        title: "Hamster",
        image: "/assets/categories/hamster-category.jpg",
        numberOfProducts: 10
      }
    ]
  }

}
