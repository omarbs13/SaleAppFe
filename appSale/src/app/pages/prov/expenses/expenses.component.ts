import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProvider } from 'src/app/interface/DialogData ';
import { ProviderService } from 'src/app/services/provider.service';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styles: [
  ]
})
export class ExpensesComponent implements OnInit {
  titleModal: string = '';

  providerForm: FormGroup = new FormGroup({
    providerId: new FormControl(''),
    description: new FormControl(''),
    totalProducts: new FormControl(''),
    total: new FormControl('')    
  });

  constructor(
    public dialogRef: MatDialogRef<ExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProvider,
    private providerService: ProviderService,
    private catService: CatalogService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;   
    this.titleModal=this.data.providerName;
      this.createForm(this.data.id);
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancel();
      }
    });
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
 
      this.providerService
        .postProvider(this.providerForm.value)
        .subscribe((data: any) => {
          if (data.success) {
            this.data.success = true;
            this.dialogRef.close(this.data);
          }
        });
        
  }

  get description() {
    return this.providerForm.get('providerName');
  }
  get totalProducts() {
    return this.providerForm.get('email');
  }
  get total() {
    return this.providerForm.get('phone');
  }
  

  createForm(id:number) {
    this.providerForm = new FormGroup({
      providerId: new FormControl(id),
      description: new FormControl('',Validators.required   ),
      totalProducts: new FormControl('',Validators.required),
      total: new FormControl('',Validators.required)
    });
  }  
}
