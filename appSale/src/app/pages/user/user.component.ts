import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  animal: string="";
  name: string="";
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
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(this.animal);
    });
  }

}
