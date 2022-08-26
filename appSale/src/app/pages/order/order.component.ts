import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/app/interface/user.mode';
import { PackagesService } from '../../services/packages.service';
import { UrlImages } from '../../../environments/environment';
import { ProductModel } from '../../interface/user.mode';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  packageList: PackageModel[] = [];
  productList:ProductModel[] = [];
  url: string = UrlImages;
  constructor(private packagesService: PackagesService,private productService: ProductService) {}

  ngOnInit(): void {
    this.packagesService.getAllPackages().subscribe((data) => {
      this.packageList = data;
    });

    this.productService.getAll().subscribe((data) => {
      this.productList = data;
    });
  }

  getPath(img: string): string {
    return UrlImages + img;
  }
}
