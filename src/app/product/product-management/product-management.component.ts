import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductTableComponent } from './product-table/product-table.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {


}
