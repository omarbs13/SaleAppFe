import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import {
  CityModel,
  CustomerModel,
  PackageModel,
  StateModel,
  SubsidiaryModel,
} from 'src/app/interface/user.mode';
import { CatalogService } from 'src/app/services/catalog.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PackagesService } from 'src/app/services/packages.service';
import { SubsidiaryService } from 'src/app/services/subsidiary.service';
import { RfcValid } from 'src/environments/environment';
import { DishService } from '../../../services/dish.service';

@Component({
  selector: 'app-current-modal',
  templateUrl: './current-modal.component.html',
  styleUrls: ['./current-modal.component.css'],
})
export class CurrentModalComponent implements OnInit {
  titleModal: string = '';

  packages: PackageModel[] = [];
  subs: SubsidiaryModel[] = [];

  dishForm: FormGroup = new FormGroup({
    menuDayId: new FormControl(0),
    packageId: new FormControl(''),
    sucursalId: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CurrentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dishService: DishService,
    private packageService: PackagesService,
    private subsidiaryService: SubsidiaryService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;

    this.createForm();
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancel();
      }
    });
    this.getPacakges();
    this.getSubs();
  }

  onCancel(): void {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.dishForm.invalid) {
      console.log(this.dishForm);
      return;
    }

    this.dishService.postDishes(this.dishForm.value).subscribe((data: any) => {
      if (data.success) {
        this.data.success = true;
        this.dialogRef.close(this.data);
      }
    });
  }

  get packageId() {
    return this.dishForm.get('packageId');
  }
  get sucursalId() {
    return this.dishForm.get('sucursalId');
  }

  createForm() {
    this.dishForm = new FormGroup({
      menuDayId: new FormControl(0),
      packageId: new FormControl('', Validators.required),
      sucursalId: new FormControl('', Validators.required),
    });
  }

  getSubs() {
    this.subsidiaryService.getAllSubsidiaries().subscribe((data) => {
      this.subs = data;
    });
  }

  getPacakges() {
    this.packageService.getAllPackages().subscribe((data) => {
      this.packages = data;
    });
  }
}
