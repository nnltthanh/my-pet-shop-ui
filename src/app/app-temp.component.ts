// import { NgIf } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { KeycloakEventType, KeycloakService } from 'keycloak-angular';

// import { environment } from '../environments/environment';
// import { FooterComponent } from './common/footer/footer.component';
// import { HeaderComponent } from './common/header/header.component';
// import { SpinnerComponent } from './common/spinner/spinner.component';
// import { ToastMessageComponent } from './message/toast-message/toast-message.component';
// import { AuthService } from './sec/auth.service';
// import { LastActiveService } from './sec/last-active.service';
// import { SESSION_STORAGE_KEY } from './session-storage/session-storage-key.constants';
// import { SessionStorageService } from './session-storage/session-storage.service';
// import { User } from './user/model/user.model';
// import { UserService } from './user/user.service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet,
//             SpinnerComponent,
//             ToastMessageComponent,
//             HeaderComponent,
//             FooterComponent,
//             NgIf],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss',
//   providers: [User, UserService, SessionStorageService]
// })
// export class AppComponent implements OnInit {

//   user: User;

//   constructor(
//     private userService: UserService,
//     private sessionStorageService: SessionStorageService,
//     private keycloakService: KeycloakService,
//     private authService: AuthService,
//     private lastActiveService: LastActiveService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.user = this.sessionStorageService.getUser();
//     this.keycloakService.loadUserProfile().then(() => {
//       if(this.keycloakService.getUsername() !==  this.user?.username || this.user === null) {
//         this.getLoggedInUser();
//       }
//     });
//     this.handleAccessTokenFromKeyCloak();
//   }

//   isRouteToAccessDenied() {
//     return this.router.url.includes("denied");
//   }

//   private getLoggedInUser(): void {
//     this.userService.login().subscribe((user: User) => {
//       this.user = user;
//       this.sessionStorageService.save(SESSION_STORAGE_KEY.USER, JSON.stringify(user));
//     });
//   }

//   private handleAccessTokenFromKeyCloak() {
//     this.keycloakService.keycloakEvents$.subscribe((event) => {
//       if (event.type == KeycloakEventType.OnTokenExpired) {
//         let lastActive = this.lastActiveService.getLastActiveFromLocalStorage();
//         let accessTokenLifespan = environment.keycloak.accessTokenLifespan;
//         if (lastActive === null || this.checkTokenExpired(lastActive, accessTokenLifespan)) {
//           this.authService.onLogout();
//         } else {
//           this.keycloakService.updateToken(accessTokenLifespan);
//         }
//       }
//     });
//   }

//   private checkTokenExpired(lastActive: Date, accessTokenLifespan: number) {
//     return (new Date().getTime() > lastActive?.getTime() + (accessTokenLifespan - 60000)
//     ); //minus 1 minute -> make sure token expired after access token lifespan
//   }

// }
