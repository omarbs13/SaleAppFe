import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { ProductModel, ProviderModel } from 'src/app/interface/user.mode';
import { ProviderService } from '../../../services/provider.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styles: [],
})
export class ProductModalComponent implements OnInit {
  titleModal: string = '';
  isNew: boolean = true;

  providers: ProviderModel[] = [];
  productForm: FormGroup = new FormGroup({
    productId: new FormControl('id'),
    productName: new FormControl('id'),
    description: new FormControl('id'),
    providerId: new FormControl('id'),
    salePrice: new FormControl('id'),
    purchasePrice: new FormControl('id'),
    packagePrice: new FormControl('id'),
    providerName: new FormControl(''),
    user: new FormControl('id'),
  });

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductService,
    private providerService: ProviderService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;
    this.isNew = data.id == 0;
    if (!this.isNew) {
      this.productService.get(data.id).subscribe((res) => {
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
    this.getProviders();
  }

  onCancel(): void {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      console.log(this.productForm);
      return;
    }
    if (this.isNew) {
      this.productService
        .post(this.productForm.value)
        .subscribe((data: any) => {
          if (data.success) {
            this.data.success = true;
            this.dialogRef.close(this.data);
          }
        });
    }
    if (!this.isNew) {
      this.productService.put(this.productForm.value).subscribe((data: any) => {
        if (data.success) {
          this.data.success = true;
          this.dialogRef.close(this.data);
        }
      });
    }
  }

  get productName() {
    return this.productForm.get('productName');
  }
  get description() {
    return this.productForm.get('description');
  }
  get providerId() {
    return this.productForm.get('providerId');
  }
  get purchasePrice() {
    return this.productForm.get('purchasePrice');
  }
  get salePrice() {
    return this.productForm.get('salePrice');
  }
  get city() {
    return this.productForm.get('city');
  }
  get packagePrice() {
    return this.productForm.get('packagePrice');
  }

  createForm(item?: ProductModel) {
    let id = item ? item.productId : 0;
    this.productForm = new FormGroup({
      productId: new FormControl(id),
      productName: new FormControl(item?.productName, Validators.required),
      description: new FormControl(item?.description, Validators.required),
      providerId: new FormControl(item?.providerId, Validators.required),
      salePrice: new FormControl(item?.salePrice, Validators.required),
      purchasePrice: new FormControl(item?.purchasePrice, Validators.required),
      packagePrice: new FormControl(item?.packagePrice),
      providerName: new FormControl(''),
      user: new FormControl('admin'),
    });
  }

  getProviders() {
    this.providerService
      .getAllProviders()
      .subscribe((data) => (this.providers = data));
  }
}
