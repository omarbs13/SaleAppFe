import { Component, OnInit } from '@angular/core';
import {
  CustomerModelClass,
  DishPackageModel,
  OrderDetailModel,
  SubsidiaryModel,
} from 'src/app/interface/user.mode';
import { UrlImages } from '../../../environments/environment';
import { ProductModel, OrderModel } from '../../interface/user.mode';
import { ProductService } from '../../services/product.service';
import { SubsidiaryService } from '../../services/subsidiary.service';
import { DishService } from '../../services/dish.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  packageList: DishPackageModel[] = [];
  productList: ProductModel[] = [];
  subsList: SubsidiaryModel[] = [];
  orderList: OrderDetailModel[] = [];
  subsidiaryId: number = 0;
  orderProducsts: OrderModel = {} as OrderModel;
  customer: CustomerModelClass = {} as CustomerModelClass;
  url: string = UrlImages;
  orderPrice: number = 0;
  isRequired: boolean = false;
  isDeliveryMatriz: boolean = false;
  orderForm: FormGroup = new FormGroup({
    packageId: new FormControl(''),
    phone: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
    paymentTypeId: new FormControl('1'),
    address: new FormControl(''),
  });

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private subsidiaryService: SubsidiaryService,
    private dishService: DishService,
    private orderService: OrderService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.productList = data;
    });

    this.getSubsidiaries();
    this.getDishes(0);
  }

  getPath(img: string): string {
    return UrlImages + img;
  }

  getSubsidiaries() {
    this.subsidiaryService
      .getAllSubsidiaries()
      .subscribe((data) => (this.subsList = data));
  }

  changeDishes(e: any) {
    this.subsidiaryId = e.value;
    this.getDishes(this.subsidiaryId);
  }

  getDishes(id: number) {
    this.dishService
      .getAllDishesPackages(id)
      .subscribe((data) => (this.packageList = data));
  }

  addDish(dish: DishPackageModel) {
    let dishToAdd: OrderDetailModel = {
      cantidad: 1,
      packageId: dish.packageId,
      price: dish.price,
      product: dish.packageName,
      productId: 0,
      total: dish.price,
      desc: dish.description,
    };

    let finded = this.orderList.find((x) => x.packageId == dish.packageId);
    if (finded != undefined) {
      this.orderList.splice(this.orderList.indexOf(finded), 1);
    }
    this.orderList.push(dishToAdd);
    this.getTotal();
  }

  delete(id: number) {
    let finded = this.orderList.find((x) => x.packageId == id);
    if (finded != undefined) {
      this.orderList.splice(this.orderList.indexOf(finded), 1);
      return;
    }
    finded = this.orderList.find((x) => x.productId == id);
    if (finded != undefined) {
      this.orderList.splice(this.orderList.indexOf(finded), 1);
    }
    this.getTotal();
  }

  calculate(cant: any, dish: OrderDetailModel) {
    dish.total = dish.price * cant.value;
    dish.cantidad = cant.value;
    let index = this.orderList.indexOf(dish);
    this.orderList.splice(index, 1);
    this.orderList.push(dish);
    this.orderList = [...this.orderList];
    this.getTotal();
  }

  getTotal() {
    this.orderPrice = 0;
    this.orderList.forEach((item) => {
      this.orderPrice += item.total;
    });
  }
  addProduct(product: ProductModel) {
    let dishToAdd: OrderDetailModel = {
      cantidad: 1,
      packageId: 0,
      price: product.salePrice,
      product: product.productName,
      productId: product.productId,
      total: product.salePrice,
      desc: product.description,
    };

    let finded = this.orderList.find((x) => x.productId == product.productId);
    if (finded != undefined) {
      this.orderList.splice(this.orderList.indexOf(finded), 1);
    }
    this.orderList.push(dishToAdd);
    this.getTotal();
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      console.log(this.orderForm);
      return;
    }
    if (this.isDeliveryMatriz && this.address?.value == '') {
      this.isRequired = true;
      return;
    } else {
      this.isRequired = false;
    }

    this.orderProducsts.address = this.address?.value;
    this.orderProducsts.cost = this.orderPrice;
    this.orderProducsts.deliveryTime = this.hour?.value;
    this.orderProducsts.detail = this.orderList;
    this.orderProducsts.phone = this.phone?.value;
    this.orderProducsts.customerId =
      this.customer == null ? 0 : (this.customer.customerId as number);

    this.orderProducsts.paymentType =
      this.orderForm.get('paymentTypeId')?.value;
    this.orderProducsts.sucursal = this.subsidiaryId;
    this.orderProducsts.storeDelivery = this.isDeliveryMatriz;
    this.orderProducsts.user = 'admin';

    this.orderService.postOrder(this.orderProducsts).subscribe((x) => {
      if (x.success) {
        Swal.fire({
          title: 'Su orden ha sido procesada!',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['/dashboard/']);
          }
        });
      }
    });
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get hour() {
    return this.orderForm.get('hour');
  }

  get address() {
    return this.orderForm.get('address');
  }

  getCustomer(e: any) {
    if (e.value != '') {
      this.customerService.geCustomerByPhone(e.value).subscribe((x) => {
        if (x != null) {
          this.customer.balance = x.balance;
          this.customer.customerName = x.customerName;
          this.customer.customerId = x.customerId;
          this.customer.email = x.email;
        } else {
          this.customer.customerId = 0;
        }
      });
    }
  }

  delivery() {
    this.isDeliveryMatriz = !this.isDeliveryMatriz;
  }
}
