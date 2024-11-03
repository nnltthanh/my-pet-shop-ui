import { Component, inject } from '@angular/core';
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
}
