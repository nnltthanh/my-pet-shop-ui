import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { distinctUntilChanged, map, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { User } from '../../../auth/user.model';
import { AccountSidebarComponent } from '../account-sidebar/account-sidebar.component';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [RouterOutlet, AccountSidebarComponent, AsyncPipe],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.scss',
})
export class CustomerPageComponent {
  private onDestroy$ = new ReplaySubject<void>(1);

  loggedInUser: Observable<User | undefined>;

  route = inject(ActivatedRoute);

  userService = inject(UserService);

  ngOnInit(): void {
    this.loggedInUser = this.userService.loggedInUser$;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
