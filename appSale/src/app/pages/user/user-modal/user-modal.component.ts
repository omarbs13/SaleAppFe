import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { RolModel } from 'src/app/models/RolModel';
import { UserService } from '../../../services/user.service';
import { UserModelUpd } from '../../../interface/user.mode';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: [],
})
export class UserModalComponent implements OnInit {
  titleModal: string = '';
  isNewUser: boolean = true;
  selectedRol: number = 2;
  rolesLst: Array<RolModel> = [
    { id: 2, name: 'Cajero' },
    { id: 3, name: 'Supervisor' },
    { id: 1, name: 'Administrador' },
  ];

  userForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
    rolId: new FormControl(''),
    user: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: UserService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;
    this.isNewUser = data.id == 0;
    if (!this.isNewUser) {
      this.service.getUser(data.id).subscribe((res) => {
        this.createForm(res);
      });
    } else {
      this.createForm();
    }
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {   
        this.onCancel();
      }
    });
  }

  onCancel(): void {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }

  onSubmit() {    
    if (this.userForm.invalid) {
      console.log(this.userForm);
      return;
    }

    if (this.isNewUser) {
      this.service.postUser(this.userForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
    if (!this.isNewUser) {
      this.service.putUser(this.userForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
  }

  get name() {
    return this.userForm.get('userName');
  }
  get password() {
    return this.userForm.get('password');
  }

  createForm(user?: UserModelUpd) {
    let rol=2;
    if(user?.rolId!=undefined){
      rol=user?.rolId;
    }
   
    this.userForm = new FormGroup({
      userId: new FormControl(user?.userId),
      userName: new FormControl(user?.userName, [Validators.required]),
      password: new FormControl(user?.password, [Validators.required]),
      rolId: new FormControl(rol),
      user: new FormControl('admin'),
    });
  }
}
