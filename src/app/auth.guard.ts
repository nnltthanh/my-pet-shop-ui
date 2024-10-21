import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard extends KeycloakAuthGuard implements CanActivateChild{

    granted: boolean = false;
    grantedForChild: boolean = false;
    
    constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
    ) {
    super(router, keycloak);
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const requiredRoles  = childRoute.data['roles'];
            if (!requiredRoles || requiredRoles.length === 0) {
                this.grantedForChild = true;    
            } else {
                for (const requiredRole of requiredRoles) {
                    if (this.roles.indexOf(requiredRole) > -1) {
                        this.grantedForChild = true;
                        break;
                    }
                }
            }

            // if (this.grantedForChild === false) {   
            //     this.router.navigate(['jobs']);
            //     return false
            // }
            
            return true;
    }
      
      isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
          return new Promise ((resolve, reject) => {
            if(!this.authenticated){
                this.keycloak.login();
                return;
            }

            const requiredRoles  = route.data['roles'];

            if (!requiredRoles || requiredRoles.length === 0) {
                this.granted = true;    
            } else {
                for (const requiredRole of requiredRoles) {
                    if (this.roles.indexOf(requiredRole) > -1) {
                        if (this.keycloak.getKeycloakInstance().hasResourceRole(requiredRole, environment.keycloak.clientId)) {
                            this.granted = true;
                        }
                        break;
                    }
                }
            }

            // if (this.granted === false) {   
            //     this.router.navigate(['denied']);
            // }
            resolve(this.granted);
        });
    }
}

