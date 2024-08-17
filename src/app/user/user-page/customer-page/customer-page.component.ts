import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [RouterOutlet, AccountSidebarComponent],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.scss'
})
export class CustomerPageComponent {

}
