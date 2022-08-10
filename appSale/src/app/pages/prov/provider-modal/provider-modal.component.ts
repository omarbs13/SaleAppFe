import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { RolModel } from 'src/app/models/RolModel';
import { UserService } from '../../../services/user.service';
import { UserModelUpd } from '../../../interface/user.mode';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: []
})
export class ProviderModalComponent implements OnInit {
  titleModal: string = '';
  isNewUser: boolean = true;
  selectedRol: number = 2;
  rolesLst: Array<RolModel> = [
    { id: 2, name: 'Cajero' },
    { id: 3, name: 'Supervisor' },
    { id: 1, name: 'Administrador' },
  ];

  providerForm: FormGroup = new FormGroup({
    providerCustomerId: new FormControl(''),
    providerName: new FormControl(''),
    email: new FormControl(''),
    rfc: new FormControl(''),
    street: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    phone: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<ProviderModalComponent>,
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
    if (this.providerForm.invalid) {
      console.log(this.providerForm);
      return;
    }

    if (this.isNewUser) {
      this.service.postUser(this.providerForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
    if (!this.isNewUser) {
      this.service.putUser(this.providerForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
  }

  get providerName() {
    return this.providerForm.get('providerName');
  }
  get email() {
    return this.providerForm.get('email');
  }
  get rfc() {
    return this.providerForm.get('rfc');
  }
  get street() {
    return this.providerForm.get('street');
  }
  get state() {
    return this.providerForm.get('state');
  }

  createForm(user?: UserModelUpd) {
    let rol=2;
    if(user?.rolId!=undefined){
      rol=user?.rolId;
    }
   
    this.providerForm = new FormGroup({
      userId: new FormControl(user?.userId),
      userName: new FormControl(user?.userName, [Validators.required]),
      password: new FormControl(user?.password, [Validators.required]),
      rolId: new FormControl(rol),
      user: new FormControl('admin'),
    });
  }
}
