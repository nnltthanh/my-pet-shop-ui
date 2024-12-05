import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { User } from '../../../auth/user.model';
import { UserService } from '../../../services/user.service';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';
import { ToastMessageService } from '../../../sharing/toast-message/toast-message.service';

@Component({
  selector: 'app-user-info-display',
  standalone: true,
  imports: [FormsModule, NgIf, CalendarModule, DatePipe],
  templateUrl: './user-info-display.component.html',
  styleUrl: './user-info-display.component.scss'
})
export class UserInfoDisplayComponent implements OnInit {

  userInfo: User;

  avatarFrameComponent = viewChild(AvatarFrameComponent);

  isEditMode: boolean = false;

  userService = inject(UserService);

  toastMessageService = inject(ToastMessageService);

  ngOnInit(): void {
    if (this.userService.getLoggedInUser()) {
      this.userInfo = this.userService.getLoggedInUser();
      if (this.userInfo.dob) {
        this.userInfo.dob = new Date(this.userInfo.dob);
      }
    }
  }

  clickUpdate(): void {
    this.isEditMode = true;
  }

  clickSaveUpdate(): void {
    this.userService.update(this.userInfo.id, this.userInfo, null).subscribe({
      next: (data: User) => {
        this.isEditMode = false;
        this.toastMessageService.addSuccessfulMessage("Cập nhật thông tin cá nhân thành công");
        if (this.avatarFrameComponent()) {
          this.avatarFrameComponent()!.loggedInUser = data;
        }
      }
    })
  }
}
