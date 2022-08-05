import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import Swal from 'sweetalert2';
import { ProviderModalComponent } from './provider-modal/provider-modal.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styles: [
  ]
})
export class ProviderComponent implements OnInit {

  success: boolean = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  delete(id: number) {
    Swal.fire({
      title: 'Quieres eliminar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success');
      }
    });
    console.log(id);
  }


  open(id:number) {
    const dialogRef = this.dialog.open(ProviderModalComponent, {
      width: '350px',

      data: { success: false, msg: id},
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      this.success = result.success;
      if (result.success) {
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
      console.log(this.success);
    });
  }

}
