import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { SubsidiaryModel } from 'src/app/interface/user.mode';
import Swal from 'sweetalert2';
import { SubsidiaryModalComponent } from './subsidiary-modal/subsidiary-modal.component';
import { SubsidiaryService } from 'src/app/services/subsidiary.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-subsidiary',
  templateUrl: './subsidiary.component.html',
  styles: [],
})
export class SubsidiaryComponent implements OnInit {
  success: boolean = false;
  subsidiaries: SubsidiaryModel[] = [];
  constructor(
    public dialog: MatDialog,
    private subsidiaryService: SubsidiaryService,
    private util: CommonService
  ) {
    this.subsidiaries = [];
  }

  ngOnInit(): void {
    this.getProviders();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Quieres eliminar esta sucursal?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subsidiaryService.deletetSubsidiary(id).subscribe((res) => {
          if (res.subsidiaryId > 0) {
            this.getProviders();
            Swal.fire('Eliminado!', '', 'success');
          } else {
            Swal.fire('Ocurrio un error!', '', 'warning');
          }
        });
      }
    });
  }

  open(id: number,stateId:number) {
    const dialogRef = this.dialog.open(SubsidiaryModalComponent, {
      width: '550px',
      data: { success: false, id,stateId },
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
    this.subsidiaryService.getAllSubsidiaries().subscribe((data) => {
      this.subsidiaries = data;
    });
  }

  exportExcel() {
    this.util.exportExcel('sucursales', this.subsidiaries);
  }
}
