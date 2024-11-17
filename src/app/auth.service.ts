import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { SessionStorageService } from './services/session-storage.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService,
              private sessionStorageService: SessionStorageService,
              private userService: UserService
  ) { }

  isUserInRole(role: string): boolean {
    return this.keycloakService.getKeycloakInstance().hasResourceRole(role, environment.keycloak.clientId)
  }

  onLogout() {
    this.sessionStorageService.removeAll();
    localStorage.clear();
    this.keycloakService.logout().then(value =>  {
      this.keycloakService.clearToken();
      this.userService.logout();
    });
  }

  onLogin() {
    this.sessionStorageService.removeAll();
    this.keycloakService.login().then(value =>  {
      this.userService.login().subscribe({complete: () => {

      }})
    });
  }
  
  isLoggedIn() {
    return this.keycloakService.isLoggedIn();
  }

}
