import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-frame.component.html',
  styleUrl: './avatar-frame.component.scss'
})
export class AvatarFrameComponent {

  avatar?: string;

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
    const reader = new FileReader();
    reader.onload = async () => {

      this.avatar = reader.result as string;
      console.log(this.avatar);

      let data = new FormData();
      data.append('image', file);

    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
