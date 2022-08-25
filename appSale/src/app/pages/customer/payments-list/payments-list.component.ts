import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { PaymentCustomerModel } from 'src/app/interface/user.mode';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styles: [
  ]
})
export class PaymentsListComponent implements OnInit {
  titleModal: string = '';
  payments: PaymentCustomerModel[] = [];
  prividerId:number=0;
  constructor(
    public dialogRef: MatDialogRef<PaymentsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private customerService: CustomerService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;    
    this.prividerId=this.data.id;
    this.titleModal = this.data.msg;
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancel();
      }
    });
    this.getExpenses(this.prividerId);
  }

  onCancel(): void {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }
  getExpenses(id:number) {
    this.customerService.getPayments(id).subscribe((x) =>{ this.payments = x;  });
  }
}
