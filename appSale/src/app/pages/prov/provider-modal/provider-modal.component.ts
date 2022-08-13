import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { CityModel, ProviderModel, StateModel } from '../../../interface/user.mode';
import { CatalogService } from 'src/app/services/catalog.service';
import { ProviderService } from 'src/app/services/provider.service';
import { RfcValid } from 'src/environments/environment';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: [],
})
export class ProviderModalComponent implements OnInit {
  titleModal: string = '';
  isNewProvider: boolean = true;
  selectedRol: number = 2;
  states: StateModel[] = [];
  cities: CityModel[] = [];
  
  providerForm: FormGroup = new FormGroup({
    providerCustomerId: new FormControl(''),
    providerName: new FormControl(''),
    email: new FormControl(''),
    rfc: new FormControl(''),
    street: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    phone: new FormControl(''),
    phone2: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<ProviderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private providerService: ProviderService,
    private catService: CatalogService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;
    this.isNewProvider = data.id == 0;
    if (!this.isNewProvider) {
    
       this.providerService.geProvider(data.id).subscribe((res) => {
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
    if (this.providerForm.invalid) {
      console.log(this.providerForm);
      return;
    }
    console.log(this.providerForm);
    if (this.isNewProvider) {
      this.providerService.postProvider(this.providerForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
     if (!this.isNewProvider) {
      this.providerService.putProvider(this.providerForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    } 
  }

  get providerName() {
    return this.providerForm.get('providerName');
  }
  get email() {
    return this.providerForm.get('email');
  }
  get phone() {
    return this.providerForm.get('phone');
  }
  get rfc() {
    return this.providerForm.get('rfc');
  }
  get street() {
    return this.providerForm.get('street');
  }
  get state() {
    return this.providerForm.get('state');
  }
  get city() {
    return this.providerForm.get('city');
  }
  get zipCode() {
    return this.providerForm.get('zipCode');
  }

  
  createForm(provider?: ProviderModel) {   
    let id=provider? provider.providerCustomerId:0;
    this.providerForm = new FormGroup({
      providerCustomerId: new FormControl(id),
      providerName: new FormControl(provider?.providerName, Validators.required),
      email: new FormControl(provider?.email, [Validators.required, Validators.email]),
      rfc: new FormControl(provider?.rfc, [Validators.required,Validators.pattern(RfcValid)]),
      street: new FormControl(provider?.street, Validators.required),
      state: new FormControl(provider?.state, Validators.required),
      city: new FormControl(provider?.city),
      zipCode: new FormControl(provider?.zipCode, Validators.required),
      phone: new FormControl(provider?.phone, Validators.required),
      phone2: new FormControl('-')
    });
  }

  getCities(idState:any){
    this.catService.getCities(idState).subscribe(data =>this.cities=data);
    console.log(this.cities);
  }
  toUpperCase(){
    let rfcToUpper=this.rfc?.value;
    this.rfc?.setValue(rfcToUpper.toString().toUpperCase());
  }
}
