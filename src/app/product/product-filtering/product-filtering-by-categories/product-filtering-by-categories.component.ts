import { Component, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filtering-by-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filtering-by-categories.component.html',
  styleUrl: './product-filtering-by-categories.component.scss'
})
export class ProductFilteringByCategoriesComponent implements OnInit {

  accessory: boolean = false;

  food: boolean = false;

  dog: boolean = false;

  cat: boolean = false;

  hamster: boolean = false;

  categoriesChange = output<{
    accessory: boolean,
    food: boolean,
    dog: boolean,
    cat: boolean,
    hamster: boolean
  }>();

  ngOnInit(): void {
      console.log("init");
      
  }

  onCategoriesChanged() {
    this.categoriesChange.emit({
      accessory: this.accessory,
      food: this.food,
      dog: this.dog,
      cat: this.cat,
      hamster: this.hamster
    });
  }

}
