import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ProductModel,
  ProductPackageModel,
  TypePackageModel,
} from 'src/app/interface/user.mode';
import { ProductService } from '../../../services/product.service';
import { CatalogService } from '../../../services/catalog.service';
import { PackagesService } from 'src/app/services/packages.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PackageModel } from '../../../interface/user.mode';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-frm-package',
  templateUrl: './frm-package.component.html',
  styleUrls: ['./frm-package.component.css'],
})
export class FrmPackageComponent implements OnInit {
  filterId: number = 3;
  idPackage: number = 0;
  isNewPackage: boolean = true;
  pricePackage: number = 0;
  products: ProductModel[] = [];
  productsList: ProductPackageModel[] = [];
  productTypeList: TypePackageModel[] = [];
  isValidProductList: boolean = false;
  file: any;
  packageForm: FormGroup = new FormGroup({
    packageId: new FormControl(''),
    packageName: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    typePackageId: new FormControl(''),
    products: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private catalogService: CatalogService,
    private packagesService: PackagesService,
    private commonService: CommonService,
    private route: Router,
    private actRoute: ActivatedRoute
  ) {
    this.actRoute.paramMap.subscribe((res) => {
      this.idPackage = parseInt(res.get('id') || '0');
      this.isNewPackage = this.idPackage == 0;
      if (!this.isNewPackage) {
        this.packagesService.getPackage(this.idPackage).subscribe((res) => {
          res.products.forEach((item) => {
            this.pricePackage += item.price;
          });
          this.createForm(res);
        });
      } else {
        this.createForm();
      }
    });
    this.productsList = [];
  }

  ngOnInit(): void {
    this.getTypePackage();
  }

  onSubmit() {
    this.isValidProductList = false;
    if (this.packageForm.invalid) {
      console.log(this.packageForm);
      return;
    }
    if (this.productsList.length == 0) {
      this.isValidProductList = true;
      return;
    }
    if (this.file == undefined) {
      console.log(this.file);
    }
    if (this.file != undefined) {
      this.commonService.uploadImg(this.file).subscribe((data) => {
        this.packageForm.get('image')?.patchValue(data.data);
        if (this.isNewPackage) {
          this.savePackage();
        } else {
          this.updatePackage();
        }
      });
    } else {
      if (this.isNewPackage) {
        this.savePackage();
      } else {
        this.updatePackage();
      }
    }
  }

  savePackage() {
    this.packagesService
      .postPackage(this.packageForm.value, this.productsList)
      .subscribe((x) => {
        if (x.success) {
          Swal.fire('Registro guardado!', '', 'success').then((result) => {
            if (result.value) {
              this.route.navigate(['/package/']);
            } else if (result.value == undefined) {
              this.route.navigate(['/package/']);
            } else {
              Swal.fire('Ocurrio un error!', '', 'warning');
            }
          });
        } else {
          Swal.fire('Ocurrio un error!', '', 'warning');
        }
      });
  }

  updatePackage() {
    this.packagesService
      .putPackage(this.packageForm.value, this.productsList)
      .subscribe((x) => {
        if (x.success) {
          Swal.fire('Registro guardado!', '', 'success').then((result) => {
            if (result.value) {
              this.route.navigate(['/package/']);
            } else if (result.value == undefined) {
              this.route.navigate(['/package/']);
            } else {
              Swal.fire('Ocurrio un error!', '', 'warning');
            }
          });
        }
      });
  }

  getTypePackage() {
    this.catalogService
      .getTypePackage()
      .subscribe((data) => (this.productTypeList = data));
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
    this.productService.filter(this.filterId, text).subscribe((res) => {
      this.products = res;
    });
  }

  addProduct(product: ProductModel) {
    let { productId, productName, packagePrice } = product;

    const pkg: ProductPackageModel = {} as ProductPackageModel;
    pkg.price = packagePrice;
    pkg.productId = productId;
    pkg.productName = productName;
    this.pricePackage += pkg.price;
    this.productsList.push(pkg);
  }

  filter(e: any) {
    this.filterId = e.id;
  }

  delete(product: ProductPackageModel) {
    let indx = this.productsList.findIndex(
      (x) => x.productId == product.productId
    );
    if (indx > -1) {
      this.productsList.splice(indx, 1);
      this.pricePackage -= product?.price;
    }
  }

  createForm(pkg?: PackageModel) {
    console.log(pkg);
    this.productsList = pkg?.products!;
    let type: number = pkg?.typePackageId == null ? 1 : pkg?.typePackageId;
    let id: number = pkg?.packageId == null ? 0 : pkg?.packageId;
    this.packageForm = new FormGroup({
      packageId: new FormControl(id),
      packageName: new FormControl(pkg?.packageName, Validators.required),
      description: new FormControl(pkg?.description, Validators.required),
      price: new FormControl(pkg?.price, Validators.required),
      typePackageId: new FormControl(type, Validators.required),
      products: new FormControl(''),
      image: new FormControl(pkg?.img),
    });
  }

  back() {
    this.route.navigate(['/package/']);
  }

  uploadFile(files: any) {
    if (files.target.files.length > 0) {
      const file = files.target.files[0];
      this.file = file;
    }
  }
}
