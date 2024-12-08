import { AsyncPipe } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../services/cart.service';
import { HeaderSearchChangeService } from '../services/header-search-change-service.service';
import { ProductImageSearcher } from '../services/product-image-searcher.service';
import { ProductService } from '../services/product.service';
import { getLoggedInUserId } from '../services/user.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  authService = inject(AuthService);

  isExpanded: boolean = false;

  navWidth: string = "80%";

  keyword: string;

  productImageSearcher = inject(ProductImageSearcher);

  productService = inject(ProductService);

  headerSearchChangeService = inject(HeaderSearchChangeService);

  route = inject(ActivatedRoute);

  router = inject(Router);

  cartService = inject(CartService);

  cartNumber$: Observable<number>;

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.cartNumber$ = this.cartService.getCartNumber();
      
      this.cartService.getCart(getLoggedInUserId()).subscribe({
        complete: () => {}
      })
    }
  }

  logout(): void {
    console.log("logout", this.authService.isLoggedIn());
    this.authService.onLogout();
  }

  login(): void {
    console.log("login", this.authService.isLoggedIn());
    this.authService.onLogin();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isExpanded = scrollTop > 50;
  }

  onSearch(event: any) {
    if (event && event.files && event.files.length > 0) {
      this.productImageSearcher.predict(event.files[0]).subscribe((data) => {
        let keyword: string = '';
        if (data && data.prediction) {
          keyword = data.prediction;
          this.keyword = keyword;
        }
        this.onSearchKeyword(keyword);
      });
    }
  }

  onSearchKeyword($event: string) {    
    if (this.router.url !== "/products") {
      this.router.navigate(["products"]);
    }
    let keyword: string = $event ?? '';
    keyword = keyword.replace(/_/g, ' ');
    this.keyword = keyword;
    console.log(keyword);
    this.headerSearchChangeService.updateKeyword($event);
  }

}
