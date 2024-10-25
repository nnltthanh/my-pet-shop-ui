import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { TableLazyLoadEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { User } from '../../auth/user.model';
import { UserService } from '../../services/user.service';

import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountAddDialogComponent } from './account-add-dialog/account-add-dialog.component';


@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    TableModule,
    ConfirmDialogModule,
    InputNumberModule,
    FormsModule,
    TagModule,
    DialogModule,
    RatingModule,
    CurrencyPipe,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss'
})
export class AccountManagementComponent implements AfterViewChecked {

  UserDialog: boolean = false;

  addUserDialog: boolean = false;

  // UserDetailDialog: boolean = false;

  total: number = 0;

  users!: User[];

  user!: User;

  selectedUsers: User[] = [];

  submitted: boolean = false;

  loading: boolean = false;

  displayingInventoryStatus: string = '';

  imagePath: any;

  currentTableLazyLoadEvent: TableLazyLoadEvent;

  userService = inject(UserService);

  modalService = inject(NgbModal);

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
 
  ngOnInit() {
    this.userService
      .findAll()
      .subscribe((data) => {
        // this.users = [...data.data];
        // this.total = data.total;
        this.users = [...data];
        this.total = data.length;
        this.loading = false;
      });
  }

  openNew() {
    const modalRef = this.modalService.open(AccountAddDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'xl'
    });
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.loadUsers(this.currentTableLazyLoadEvent);
        }
      },
      (reason) => {
        if (
          reason == ModalDismissReasons.BACKDROP_CLICK ||
          reason == ModalDismissReasons.ESC
        ) {
        }
      })
  }

  deleteSelectedUsers() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected Users?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.Users = this.Users.filter((val) => !this.selectedUsers?.includes(val));
    //         this.selectedUsers = null;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    //     }
    // });
  }

  // editUser(User: User) {
  //   this.User = { ...User };
  //   this.UserDialog = true;
  // }

  deleteUser(User: User) {
    this.loading = true;
    // this.userService.delete(User.id).subscribe({
    //   error: (error) => {
    //     console.log(error);
    //     this.loading = false;
    //   },
    //   complete: () => {
    //     this.loadPetUsers(this.currentTableLazyLoadEvent);
    //   },
    // });
  }

  onSubmitted(event: boolean) {
    if (event) {
      this.loadUsers(this.currentTableLazyLoadEvent);
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    // for (let i = 0; i < this.Users.length; i++) {
    //     if (this.Users[i].id === id) {
    //         index = i;
    //         break;
    //     }
    // }

    return index;
  }

  onSearch(value: string) {}

  onUpload(event: UploadEvent) {
    
  }

  onLoading(event: boolean) {
    this.loading = event;
  }

  onSelect(event: any) {
    this.imagePath =
      event.currentFiles[0].objectURL?.changingThisBreaksApplicationSecurity;
  }

  loadUsers(event: TableLazyLoadEvent) {
    this.currentTableLazyLoadEvent = event;

    this.loading = true;

    let params = new HttpParams();
    params = params.append('pageSize', event?.rows ?? 15);
    params = params.append('page', (event?.first ?? 0) / (event?.rows ?? 15));
    if (event?.multiSortMeta) {
      let ascValues: string[] = [];
      let descValues: string[] = [];
      event?.multiSortMeta.forEach((field) => {
        if (field?.order === 1) {
          ascValues.push(field.field);
        } else if (field?.order === -1) {
          descValues.push(field?.field);
        }
      });
      if (ascValues.length > 0) {
        params = params.append('asc', ascValues.join(','));
      }
      if (descValues.length > 0) {
        params = params.append('desc', descValues.join(','));
      }
    }
    this.userService
      // .findAllBy(params)
      .findAll()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        // this.users = [...data.data];
        // this.total = data.total;
        this.users = [...data];
        this.total = data.length;
      });
  }

  onBlock(user: User) {
    this.userService.updatePartially(user.id, "validTo", "block").subscribe({
      next: (data) => {
        this.loadUsers(this.currentTableLazyLoadEvent);
      }
    })
  }

  onUnblock(user: User) {
    this.userService.updatePartially(user.id, "validTo", "").subscribe({
      next: (data) => {
        this.loadUsers(this.currentTableLazyLoadEvent);
      }
    })
  }

}
