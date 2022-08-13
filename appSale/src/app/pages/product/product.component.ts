import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { ProductModel } from 'src/app/interface/user.mode';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {
  success: boolean = false;
  products: ProductModel[] = [];
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private util: CommonService
  ) {
    this.products = [];
  }

  ngOnInit(): void {
    this.getProviders();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Quieres eliminar este producto?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe((res) => {
          if (res.productId > 0) {
            this.getProviders();
            Swal.fire('Eliminado!', '', 'success');
          } else {
            Swal.fire('Ocurrio un error!', '', 'warning');
          }
        });
      }
    });
  }

  open(id: number) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '550px',
      data: { success: false, id: id },
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      this.success = result.success;
      if (result.success) {
        Swal.fire('Registro guardado!', '', 'success');
        this.getProviders();
      }
    });
  }

  getProviders() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  exportExcel() {
    this.util.exportExcel('productos', this.products);
  }
}
