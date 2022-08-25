import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCustomer } from 'src/app/interface/DialogData ';
import { CreditCustomerModel } from 'src/app/interface/user.mode';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: [],
})
export class AbonoComponent implements OnInit {
  ckhCash: boolean = true;
  ckhCard: boolean = false;
  cambio: number = 0;
  totalTo: number = 0;
  liquidate: number = 0;
  customerName: string = '';
  credits: CreditCustomerModel[] = [];
  form: FormGroup = new FormGroup({
    payment: new FormControl(),
    numericReference: new FormControl(''),
    creditCustomerId: new FormControl(''),
    paymentType: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<AbonoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomer,
    private customerService: CustomerService
  ) {
    dialogRef.disableClose = true;
    this.liquidate = Math.abs(data.ammount);
    this.customerName = data.customerName;
  }

  ngOnInit(): void {
    this.createForm();
    this.customerService
      .getCredits(this.data.id)
      .subscribe((x) => (this.credits = x));
  }
  createForm() {
    this.form = new FormGroup({
      payment: new FormControl(this.liquidate, Validators.required),
      numericReference: new FormControl(''),
      creditCustomerId: new FormControl(this.data.id),
      paymentType: new FormControl(''),
    });
  }
  get payment() {
    return this.form.get('payment');
  }

  checkCash() {
    this.ckhCash = !this.ckhCash;
  }

  checkCard() {
    this.ckhCard = !this.ckhCard;
  }

  onCancel() {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }

  calculaCambio() {
    this.cambio =this.liquidate - this.payment?.value;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if( this.ckhCash && this.ckhCard){
      this.form.get('paymentType')?.patchValue("efectivo|tarjeta");
    }else
    if(this.ckhCash){
      this.form.get('paymentType')?.patchValue("efectivo");
    }else  if(this.ckhCard){
      this.form.get('paymentType')?.patchValue("tarjeta");
    }
    if(!this.ckhCash && !this.ckhCard){
      this.form.get('paymentType')?.patchValue("efectivo");
    }

    this.customerService
        .postCreditCustomer(this.form.value)
        .subscribe((data: any) => {
          if (data.success) {
            this.data.success = true;
            this.dialogRef.close(this.data);
          }
        });
  }
  getAmmount(id: number) {
    let credit = this.credits.filter((el) => el.creditCustomerId == id)[0];
    this.form.get( 'payment')?.patchValue(credit.cost);
    this.liquidate=credit.cost;
  }
}
