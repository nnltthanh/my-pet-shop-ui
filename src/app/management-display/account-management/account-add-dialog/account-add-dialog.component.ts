import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { User } from '../../../auth/user.model';
import { Gender } from '../../../gender.model';
import { UserService } from '../../../services/user.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastMessageService } from '../../../sharing/toast-message/toast-message.service';

@Component({
  selector: 'app-account-add-dialog',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    FileUploadModule,
    TagModule,
    ButtonModule,
    FormsModule,
    NgIf,
    FormsModule,
    EditorModule,
    CalendarModule,
    MatExpansionModule,
    PanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    MultiSelectModule
  ],
  templateUrl: './account-add-dialog.component.html',
  styleUrl: './account-add-dialog.component.scss'
})
export class AccountAddDialogComponent {

  activeModal: NgbActiveModal;

  userService = inject(UserService);

  readonly genders = Gender;

  imageSrc: string = '';

  uploadFile: File;

  name: string = '';

  gender: Gender;

  dob: Date;

  email: string;

  phone: string;

  account: string;

  password: string;

  emplCode: string;

  availableGroups = [
    "Nhân viên tiếp tân",
    "Nhân viên dịch vụ",
    "Khách hàng",
    "Quản trị viên"
  ];

  selectedGroups: string[] = [];
  toastMessageService = inject(ToastMessageService);
  closeDialog() {
    this.activeModal.close(true);
  }

  dismissDialog() {
    this.activeModal.dismiss(undefined);
  }

  saveUser() {
    if (this.name.trim()) {
      let user: User = new User();
      user.name = this.name;

      if (this.dob) {
        let dobCalculating: Date = new Date(this.dob);
        user.dob = this.formatDate(dobCalculating);
      }
      user.gender = this.gender ?? Gender.OTHER;
      user.phone = this.phone;
      user.email = this.email;
      user.account = this.account;
      user.password = this.password;
      user.emplCode = this.emplCode ?? null;
      user.groups = this.convertToKeycloakGroups(this.selectedGroups);

      this.userService.add(user, this.uploadFile).subscribe({
        next: (data) => {
          this.toastMessageService.addSuccessfulMessage("Thêm người dùng thành công");
          this.activeModal.close(data);
        },
      });
    }
  }

  onSelectImage(file: any | File) {
    this.uploadFile = file;
    this.imageSrc = file?.objectURL;
  }

  choose(event: any, callback: any) {
    callback();
  }

  monthDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // padStart ensures two digits for month
    const day = date.getDate().toString().padStart(2, '0'); // padStart ensures two digits for day

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  convertToKeycloakGroups(selectedGroups: string[]) {
    let keycloakGroups: string[] = [];

    selectedGroups?.forEach((group) => {
      let keycloakGroup: string | null = null;
      if (group === 'Nhân viên tiếp tân') {
        keycloakGroup = 'RECEPTIONIST_STAFF';
      } else if (group === 'Nhân viên dịch vụ') {
        keycloakGroup = 'SERVICE_STAFF';
      } else if (group === 'Quản trị viên') {
        keycloakGroup = 'ADMIN';
      }

      if (keycloakGroup && keycloakGroups.indexOf(keycloakGroup) === -1) {
        keycloakGroups.push(keycloakGroup);
      }
    });

    keycloakGroups = [... keycloakGroups];
    
    return keycloakGroups;
  }
}
