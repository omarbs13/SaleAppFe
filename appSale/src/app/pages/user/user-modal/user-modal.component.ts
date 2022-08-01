import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { RolModel } from 'src/app/models/RolModel';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: [],
})
export class UserModalComponent implements OnInit {
  titleModal: string = '';

  selectedRol:number=2;
  rolesLst:Array<RolModel> = [
      {id: 2, name: "Cajero"},
      {id: 3, name: "Supervisor"},
      {id: 1, name: "Administrador"}
  ];

  userForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    rolId: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service:UserService
  ) {
    this.createForm();
    console.log('DialogData',data);
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.log(this.userForm);
      return;
    }
    
    console.warn(this.userForm.value);
    this.data.success=true;
    this.dialogRef.close(this.data);
   /*  this.service.postUser(this.userForm.value).subscribe((data: any) => {
      console.log(data);
      
      if (!data.success) {      
        
      } else {
         
      }
    }); */
  }
 
  get name() {
    return this.userForm.get('userName');
  }
  get password() {
    return this.userForm.get('password');
  }

  createForm(){
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rolId: new FormControl('2'),
    });
  }
}
