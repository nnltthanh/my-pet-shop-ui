import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { SpinnerInterceptor } from './spinner.interceptor';
import { KeycloakInitializerProvider } from './keycloak-init.factory';
import { KeycloakService } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakInitializerProvider,
    // KeycloakBearerInterceptorProvider,
    
    KeycloakService,
    // provideHttpClient(withInterceptors([authenticationInterceptor]))
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    }, provideAnimationsAsync()
  ]
};
