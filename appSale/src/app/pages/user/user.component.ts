import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import Swal from 'sweetalert2';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/interface/user.mode';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnDestroy, OnInit {
  success: boolean = false;
  users: UserModel[] = [];
  constructor(public dialog: MatDialog, private userService: UserService) {
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

  ngOnDestroy(): void {}

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
