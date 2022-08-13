import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { CityModel, CustomerModel, StateModel } from 'src/app/interface/user.mode';
import { CatalogService } from 'src/app/services/catalog.service';
import { RfcValid } from 'src/environments/environment';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styles: [
  ]
})
export class CustomerModalComponent implements OnInit {
  titleModal: string = '';
  isNewCustomer: boolean = true;
  selectedRol: number = 2;
  states: StateModel[] = [];
  cities: CityModel[] = [];
 
  customerForm: FormGroup = new FormGroup({
    customerId: new FormControl(0),
    customerName: new FormControl(''),
    email: new FormControl(''),
    rfc: new FormControl(''),
    street: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    phone: new FormControl(''),
    phone2: new FormControl(''),
    balance:new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<CustomerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private customerService: CustomerService,
    private catService: CatalogService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;
    this.isNewCustomer = data.id == 0;
    if (!this.isNewCustomer) {    
       this.customerService.geCustomer(data.id).subscribe((res) => {
        this.getCities(res.state);
        this.createForm(res);
      }); 
    } else {
      this.createForm();
    }
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancel();
      }
    });
    this.catService.getStates().subscribe(data =>this.states=data);
  }

  onCancel(): void {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      console.log(this.customerForm);
      return;
    }
    if (this.isNewCustomer) {
      this.customerService.postCustomer(this.customerForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
     if (!this.isNewCustomer) {
      this.customerService.putCustomer(this.customerForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    } 
  }

  get customerName() {
    return this.customerForm.get('customerName');
  }
  get email() {
    return this.customerForm.get('email');
  }
  get phone() {
    return this.customerForm.get('phone');
  }
  get rfc() {
    return this.customerForm.get('rfc');
  }
  get street() {
    return this.customerForm.get('street');
  }
  get state() {
    return this.customerForm.get('state');
  }
  get city() {
    return this.customerForm.get('city');
  }
  get zipCode() {
    return this.customerForm.get('zipCode');
  }

  
  createForm(customer?: CustomerModel) {   
    let id=customer? customer.customerId:0;
    this.customerForm = new FormGroup({
      customerId: new FormControl(id),
      customerName: new FormControl(customer?.customerName, Validators.required),
      email: new FormControl(customer?.email, [Validators.required, Validators.email]),
      rfc: new FormControl(customer?.rfc, [Validators.required,Validators.pattern(RfcValid)]),
      street: new FormControl(customer?.street, Validators.required),
      state: new FormControl(customer?.state, Validators.required),
      city: new FormControl(customer?.city),
      zipCode: new FormControl(customer?.zipCode, Validators.required),
      phone: new FormControl(customer?.phone, Validators.required),
      phone2: new FormControl('-'),
      balance:new FormControl(customer?.Balance)
    });
  }

  getCities(idState:any){
    this.catService.getCities(idState).subscribe(data =>this.cities=data);
  }
  toUpperCase(){
    let rfcToUpper=this.rfc?.value;
    this.rfc?.setValue(rfcToUpper.toString().toUpperCase());
  }
}
