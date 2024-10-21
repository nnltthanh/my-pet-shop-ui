import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { KeycloakAngularModule } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf, AsyncPipe, NgClass, KeycloakAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-pet-shop-ui';

  $customerHeader = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        if (value.url.includes("management")) {
          this.$customerHeader.next(false);
        }
        else {
          this.$customerHeader.next(true);
        }
      }
    })
  }

}
