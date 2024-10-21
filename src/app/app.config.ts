import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { KeycloakBearerInterceptorProvider, KeycloakInitializerProvider } from './keycloak-init.factory';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakInitializerProvider,
    KeycloakBearerInterceptorProvider,
    
    KeycloakService,
    // provideHttpClient(withInterceptors([authenticationInterceptor]))
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    }, provideAnimationsAsync()
  ]
};
