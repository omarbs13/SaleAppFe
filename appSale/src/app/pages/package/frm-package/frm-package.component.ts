import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/interface/user.mode';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-frm-package',
  templateUrl: './frm-package.component.html',
  styleUrls: ['./frm-package.component.css'],
})
export class FrmPackageComponent implements OnInit {
  filterId: number = 3;
  pricePackage: number = 0;
  products: ProductModel[] = [];
  productsList: ProductModel[] = [];
  packageForm: FormGroup = new FormGroup({
    packageId: new FormControl(''),
    packageName: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    typePackageId: new FormControl(''),
    products: new FormControl(''),
  });

  constructor(private productService: ProductService) {
    this.createForm();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.packageForm.invalid) {
      console.log(this.packageForm);
      console.log(this.packageForm.value);
      return;
    }
  }

  get description() {
    return this.packageForm.get('description');
  }

  get price() {
    return this.packageForm.get('price');
  }

  get typePackageId() {
    return this.packageForm.get('typePackageId');
  }

  get packageName() {
    return this.packageForm.get('packageName');
  }

  searchProduct(text: string) {
    console.log('searchProduct');
    this.productService.filter(this.filterId, text).subscribe((res) => {
      this.products = res;
    });
  }

  addProduct(product: ProductModel) {
    this.pricePackage +=product.packagePrice;
    this.productsList.push(product);
  }

  filter(e: any) {
    this.filterId = e.id;
  }

  createForm() {
    this.packageForm = new FormGroup({
      packageId: new FormControl(''),
      packageName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      typePackageId: new FormControl('', Validators.required),
      products: new FormControl('', Validators.required),
    });
  }
}
