import { Routes } from '@angular/router';
import { HomeDisplayComponent } from './home/home-display/home-display.component';

export const routes: Routes = [
    { path: '', component: HomeDisplayComponent },
    { path: 'home', component: HomeDisplayComponent },
    {
        path: 'products',
        loadComponent: () => import('./product/product-display/product-display.component').then(m => m.ProductDisplayComponent)
    },
    {
        path: 'customer/me',
        loadComponent: () => import('./user/user-page/customer-page/customer-page.component').then(m => m.CustomerPageComponent),
        children: [
            {
              path: "info",
              loadComponent: () => import('./user/user-page/customer-page/user-info-display/user-info-display.component').then(m => m.UserInfoDisplayComponent)
            }
          ],
        },
];