import { Routes } from '@angular/router';
import { HomeDisplayComponent } from './home/home-display/home-display.component';
import { ProductDisplayComponent } from './product/product-display/product-display.component';

export const routes: Routes = [
    { path: '', component: HomeDisplayComponent },
    { path: 'home', component: HomeDisplayComponent },
    { path: 'products', component: ProductDisplayComponent },
    // { path: 'second-component', component: SecondComponent },
];
