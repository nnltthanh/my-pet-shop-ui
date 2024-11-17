import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductImageSearcher } from '../services/product-image-searcher.service';
import { ProductService } from '../services/product.service';
import { HttpParams } from '@angular/common/http';
import { HeaderSearchChangeService } from '../services/header-search-change-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  authService = inject(AuthService);

  isExpanded: boolean = false;

  navWidth: string = "80%";

  productImageSearcher = inject(ProductImageSearcher);

  productService = inject(ProductService);

  headerSearchChangeService = inject(HeaderSearchChangeService);

  route = inject(ActivatedRoute);

  router = inject(Router);

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
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
    this.headerSearchChangeService.updateKeyword($event);
  }

}
