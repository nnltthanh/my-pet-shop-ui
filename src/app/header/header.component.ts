import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
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

}
