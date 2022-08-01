import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import Swal from 'sweetalert2';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  success:boolean=false;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
 /*    Swal.fire({ title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'}) */

 /*    Swal.fire({
      template: '#exampleModal'
    }) */
  }

  save()
  {
  /*   Swal.fire({ title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'}) */
     }

  open(){
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '350px',
     
      data: {success: false, msg: ''},
    });

    dialogRef.afterClosed().subscribe((result:DialogData) => {
      console.log('The dialog was closed',result);
      this.success = result.success;
      if(result.success){
        Swal.fire({ title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'})
      }
      console.log(this.success);
    });
  }

}
