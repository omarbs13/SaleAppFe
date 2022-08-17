import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { CityModel, StateModel, SubsidiaryModel } from 'src/app/interface/user.mode';
import { CatalogService } from 'src/app/services/catalog.service';
import { SubsidiaryService } from 'src/app/services/subsidiary.service';
import { UserModel } from '../../../../interface/user.mode';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-subsidiary-modal',
  templateUrl: './subsidiary-modal.component.html',
  styles: [
  ]
})
export class SubsidiaryModalComponent implements OnInit {
  titleModal: string = '';
  isNew: boolean = true;

  states: StateModel[] = [];
  cities: CityModel[] = [];
  managers:UserModel[] = [];
  subsidiaryForm: FormGroup = new FormGroup({
    subsidiaryId: new FormControl(''),
    subsidiaryName: new FormControl(''),   
    manager: new FormControl(''),
    managerName: new FormControl(''),
    street: new FormControl(''),
    stateId: new FormControl(''),
    cityId: new FormControl(''),
    state: new FormControl(''),
    cityName: new FormControl(''),
    zipCode: new FormControl(''),
    phone: new FormControl(''),
    phone2: new FormControl(''),
    user: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<SubsidiaryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private subsidiaryService: SubsidiaryService,
    private catService: CatalogService,
    private userService:UserService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;
    this.isNew = data.id == 0;
    if (!this.isNew) {
    
       this.subsidiaryService.getSubsidiary(data.id).subscribe((res) => {
        res.stateId=data.stateId;
        this.getCities(res.stateId);
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
    this.userService.getAllUser().subscribe(data =>this.managers=data);
  }

  onCancel(): void {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.subsidiaryForm.invalid) {
      console.log(this.subsidiaryForm);
      return;
    }
    if (this.isNew) {
      this.subsidiaryService.postSubsidiary(this.subsidiaryForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
     if (!this.isNew) {
      this.subsidiaryService.putSubsidiary(this.subsidiaryForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    } 
  }
  
  get subsidiaryName() {
    return this.subsidiaryForm.get('subsidiaryName');
  }
  get manager() {
    return this.subsidiaryForm.get('manager');
  }
  get phone() {
    return this.subsidiaryForm.get('phone');
  }  
  get street() {
    return this.subsidiaryForm.get('street');
  }
  get state() {
    return this.subsidiaryForm.get('state');
  }
  get city() {
    return this.subsidiaryForm.get('city');
  }
  get zipCode() {
    return this.subsidiaryForm.get('zipCode');
  }

  
  createForm(subs?: SubsidiaryModel) {   
    let id=subs? subs.subsidiaryId:0;
    this.subsidiaryForm = new FormGroup({
      subsidiaryId: new FormControl(id),
      subsidiaryName: new FormControl(subs?.subsidiaryName, Validators.required),
      manager: new FormControl(subs?.manager, Validators.required),      
      street: new FormControl(subs?.street, Validators.required),
      stateId: new FormControl(subs?.stateId, Validators.required),
      cityId: new FormControl(subs?.cityId),
      zipCode: new FormControl(subs?.zipCode, Validators.required),
      phone: new FormControl(subs?.phone, Validators.required),
      phone2: new FormControl('-'),
      user: new FormControl('admin'),
      state: new FormControl(''),
      cityName: new FormControl(''),
      managerName: new FormControl(''),
    });
  }

  getCities(idState:any){
    this.catService.getCities(idState).subscribe(data =>this.cities=data);
  }
}
