import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import Swal from 'sweetalert2';
import { ProviderModel } from 'src/app/interface/user.mode';
import * as FileSaver from 'file-saver';
import { ProviderModalComponent } from './provider-modal/provider-modal.component';
import { ProviderService } from '../../services/provider.service';
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styles: [],
})
export class ProviderComponent implements OnInit {
  success: boolean = false;
  providers: ProviderModel[] = [];
  constructor(
    public dialog: MatDialog,
    private providerService: ProviderService
  ) {
    this.providers = [];
  }

  ngOnInit(): void {
    this.getProviders();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Quieres eliminar este proveedor?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deletetProvider(id).subscribe((res) => {
          if (res.providerCustomerId > 0) {
            this.getProviders();
            Swal.fire('Eliminado!', '', 'success');
          } else {
            Swal.fire('Ocurrio un error!', '', 'warning');
          }
        });
      }
    });
  }

  open(id: number) {
    const dialogRef = this.dialog.open(ProviderModalComponent, {
      width: '450px',
      data: { success: false, id: id },
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      this.success = result.success;
      if (result.success) {
        Swal.fire('Registro guardado!', '', 'success');
        this.getProviders();
      }
    });
  }

  getProviders() {
    this.providerService.getAllProviders().subscribe((data) => {
      this.providers = data;
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.providers);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'proveedores');
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
