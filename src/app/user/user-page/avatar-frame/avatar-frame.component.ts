import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../auth/user.model';
import { getLoggedInUserId, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-avatar-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-frame.component.html',
  styleUrl: './avatar-frame.component.scss'
})
export class AvatarFrameComponent implements OnInit {

  avatar?: string;

  userService = inject(UserService);

  loggedInUser: User;

  ngOnInit(): void {
    this.userService.loggedInUser.subscribe(
      data => {
        if (data) {
          this.loggedInUser = data;
          this.avatar = data.avatarUrl;
        }
      }
    )
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer!.files[0];
    if (file.type.startsWith('image/')) {
      this.handleImageUpload(file);
    } else {
      console.error('Invalid file type. Please drop an image.');
    }
  }

  handleImageUpload(file: File) {
    this.uploadAvatar(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onAvatarChanged(file: any | File[]) {
    if (file && file.length > 0) {
      this.uploadAvatar(file[0]);
    }
  }

  private uploadAvatar(file: File) {
    const reader = new FileReader();
      reader.onload = async () => {
  
        this.avatar = reader.result as string;
        let data = new FormData();
        data.append('image', file);
        this.userService.update(getLoggedInUserId(), this.userService.getLoggedInUser(), file).subscribe({
          next: data => {
            localStorage.setItem("user", JSON.stringify(data));
          }
        })
      };
      reader.readAsDataURL(file);
  }
}
