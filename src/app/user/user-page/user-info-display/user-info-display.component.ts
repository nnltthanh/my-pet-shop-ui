import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../auth/user.model';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-user-info-display',
  standalone: true,
  imports: [FormsModule, NgIf, CalendarModule],
  templateUrl: './user-info-display.component.html',
  styleUrl: './user-info-display.component.scss'
})
export class UserInfoDisplayComponent implements OnInit {

  userInfo: User;

  isEditMode: boolean = false;

  userService = inject(UserService);

  ngOnInit(): void {
    if (this.userService.getLoggedInUser()) {
      this.userInfo = this.userService.getLoggedInUser();
    }
  }

  clickUpdate(): void {
    this.isEditMode = true;
  }

  clickSaveUpdate(): void {
    this.userService.update(this.userInfo.id, this.userInfo, null).subscribe({
      complete: () => {
        this.isEditMode = false;
      }
    })
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

}
