import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import Swal from 'sweetalert2';
import { ProviderModel } from 'src/app/interface/user.mode';
import { ProviderModalComponent } from './provider-modal/provider-modal.component';
import { ProviderService } from '../../services/provider.service';
import { CommonService } from 'src/app/services/common.service';
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
    private providerService: ProviderService,
    private util: CommonService
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

  open(id: number,stateId:number) {
    const dialogRef = this.dialog.open(ProviderModalComponent, {
      width: '550px',
      data: { success: false, id ,stateId},
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
    this.util.exportExcel('proveedores', this.providers);
  }
}
