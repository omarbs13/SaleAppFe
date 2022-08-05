import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: []
})
export class ProviderModalComponent implements OnInit {

  userForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    rolId: new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<ProviderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service:ProviderService
  ) {
    this.createForm();
    this.data.success=false;
    console.log('DialogData',data);
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(this.data);
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
