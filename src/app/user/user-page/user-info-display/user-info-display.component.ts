import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info-display',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-info-display.component.html',
  styleUrl: './user-info-display.component.scss'
})
export class UserInfoDisplayComponent {

  isUpdatedOK = false;
  isUpdatedFailed = false;
  showUpdateModal = false;

  userInfo = {
    name: 'Thanh Nguyen',
    email: 'thanh2006@gmail.com',
    phone: '0123456789',
    dob: "06-20-2002",
    address: 'Can Tho',
    account: 'nnlthanh',
  };

  clickUpdate(): void {
    this.showUpdateModal = true;
  }

  submitUpdateInfo(): void {
    // Implement your update logic here

    // Example of setting update status
    this.isUpdatedOK = true;
    this.isUpdatedFailed = false;
    this.showUpdateModal = false;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

}
