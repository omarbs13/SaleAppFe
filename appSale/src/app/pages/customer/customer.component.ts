import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomer, DialogData } from 'src/app/interface/DialogData ';
import { CustomerModel } from 'src/app/interface/user.mode';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { CommonService } from 'src/app/services/common.service';
import { AbonoComponent } from './abono/abono.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: [],
})
export class CustomerComponent implements OnInit {
  success: boolean = false;
  customers: CustomerModel[] = [];
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private util: CommonService
  ) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Quieres eliminar este cliente?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deletetCustomer(id).subscribe((res) => {
          if (res.customerId > 0) {
            this.getCustomers();
            Swal.fire('Eliminado!', '', 'success');
          } else {
            Swal.fire('Ocurrio un error!', '', 'warning');
          }
        });
      }
    });
  }

  open(id: number, stateId: number) {
    const dialogRef = this.dialog.open(CustomerModalComponent, {
      width: '550px',
      data: { success: false, id, stateId },
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      this.success = result.success;
      if (result.success) {
        Swal.fire('Registro guardado!', '', 'success');
        this.getCustomers();
      }
    });
  }

  abonar(id: number,customerName:string,ammount:number) {
    const dialogRef = this.dialog.open(AbonoComponent, {
      width: '550px',
      data: { success: false, id,customerName,ammount },
    });

    dialogRef.afterClosed().subscribe((result: DialogCustomer) => {
      this.success = result.success;
      if (result.success) {
        Swal.fire('Registro guardado!', '', 'success');
        this.getCustomers();
      }
    });
  }

  paymentList(id: number,name:string) {
    const dialogRef = this.dialog.open(PaymentsListComponent, {
      width: '550px',
      data: { success: false, id,msg:name },
    });

    dialogRef.afterClosed().subscribe();
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  exportExcel() {
    this.util.exportExcel('clientes', this.customers);
  }
}
