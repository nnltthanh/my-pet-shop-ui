import {KeycloakBearerInterceptor, KeycloakService} from 'keycloak-angular';
import {APP_INITIALIZER, Provider} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { environment } from '../environments/environment';


export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
        initOptions: {
        onLoad: 'login-required',
        // checkLoginIframe: true,
        redirectUri: 'http://localhost:4200/',

      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer ',
    });
}

export const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true,
};

export const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService],
};
