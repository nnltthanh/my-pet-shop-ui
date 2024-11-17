import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { SpinnerComponent } from './spinner/spinner.component';
import { UserService } from './services/user.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NgIf,
    AsyncPipe,
    NgClass,
    KeycloakAngularModule,
    SpinnerComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-pet-shop-ui';

  $user: Observable<User>;

  $customerHeader = new BehaviorSubject<boolean>(false);

  authService = inject(UserService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.authService.login().subscribe({
      next: (data) => {
      }
    });
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        if (value.url.includes('management')) {
          this.$customerHeader.next(false);
        } else {
          this.$customerHeader.next(true);
        }
      }
    });
  }
  
  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  
}
