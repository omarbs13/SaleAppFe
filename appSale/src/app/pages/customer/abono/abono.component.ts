import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: [],
})
export class AbonoComponent implements OnInit {
  ckhCash: boolean = true;
  ckhCard: boolean = false;
  cambio: number = 0;
  totalTo: number = 1000;
  form: FormGroup = new FormGroup({
    total: new FormControl(),
    ref: new FormControl(),
  });
  constructor( public dialogRef: MatDialogRef<AbonoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = new FormGroup({
      total: new FormControl('', Validators.required),
      ref: new FormControl(''),
    });
  }
  get total() {
    return this.form.get('total');
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
    this.cambio =this.total?.value -this.totalTo  ;
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log(this.form);
      return;
    }
    console.log(this.form.value);
  }
}
