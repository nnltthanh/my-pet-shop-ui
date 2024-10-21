import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { SessionStorageService } from './services/session-storage.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService,
              private sessionStorageService: SessionStorageService
  ) { }

  isUserInRole(role: string): boolean {
    return this.keycloakService.getKeycloakInstance().hasResourceRole(role, environment.keycloak.clientId)
  }

  onLogout() {
    this.sessionStorageService.removeAll();
    this.keycloakService.logout(environment.BACKEND_URL).then(value =>  this.keycloakService.clearToken());
  }
}
