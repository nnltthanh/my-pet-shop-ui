import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { KeycloakAngularModule } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './auth/user.model';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './services/user.service';
import { ToastMessageComponent } from './sharing/toast-message/toast-message.component';
import { ToastMessageService } from './sharing/toast-message/toast-message.service';
import { SpinnerComponent } from './spinner/spinner.component';

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
    FooterComponent,
    ToastMessageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-pet-shop-ui';

  $user: Observable<User>;

  $customerHeader = new BehaviorSubject<boolean>(false);

  $customerFooter = new BehaviorSubject<boolean>(false);

  userService = inject(UserService);

  authService = inject(AuthService);

  toastMessageService = inject(ToastMessageService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userService.login().subscribe({
      next: (data) => {
      }
    });
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        console.log(value.url);
        
        if (value.url.includes('management') || value.url.includes('access-denied')) {
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
