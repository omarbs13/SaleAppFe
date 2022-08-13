import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import Swal from 'sweetalert2';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/interface/user.mode';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit {
  success: boolean = false;
  users: UserModel[] = [];
  constructor(public dialog: MatDialog, private userService: UserService, private util: CommonService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Quieres eliminar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deletetUser(id).subscribe((res) => {
          if (res.userId > 0) {
            this.getUsers();
            Swal.fire('Eliminado!', '', 'success');
          } else {
            Swal.fire('Ocurrio un error!', '', 'warning');
          }
        });
      }
    });
  }

  open(id: number) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '350px',
      data: { success: false, id: id },
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      this.success = result.success;
      if (result.success) {
        Swal.fire('Registro guardado!', '', 'success');
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.userService.getAllUser().subscribe((data) => {
      this.users = data;
    });
  }

  exportExcel() {    
    this.util.exportExcel('usuarios', this.users);
  }
}
