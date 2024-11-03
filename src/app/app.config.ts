import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';
import { KeycloakBearerInterceptorProvider, KeycloakInitializerProvider } from './keycloak-init.factory';
import { SpinnerInterceptor } from './spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakInitializerProvider,
    KeycloakBearerInterceptorProvider,
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    }, 
    provideAnimationsAsync()
  ]
};
