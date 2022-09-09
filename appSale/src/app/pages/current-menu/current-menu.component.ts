import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/DialogData ';
import { DishModel } from 'src/app/interface/user.mode';
import { DishService } from 'src/app/services/dish.service';
import Swal from 'sweetalert2';
import { CurrentModalComponent } from './current-modal/current-modal.component';
import { PackagesService } from '../../services/packages.service';
import { SubsidiaryService } from '../../services/subsidiary.service';

@Component({
  selector: 'app-current-menu',
  templateUrl: './current-menu.component.html',
  styleUrls: ['./current-menu.component.css'],
})
export class CurrentMenuComponent implements OnInit {
  dishes: DishModel[] = [];
 
  success: boolean = false;
  constructor(private dishService: DishService,   public dialog: MatDialog,private packageService: PackagesService,private subsidiaryService: SubsidiaryService) {}

  ngOnInit(): void {
    this.getDishes();
  }
  open(id: number) {
    const dialogRef = this.dialog.open(CurrentModalComponent, {
      width: '550px',
      data: { success: false, id },
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      this.success = result.success;
      if (result.success) {
        Swal.fire('Registro guardado!', '', 'success');
        this.getDishes();
      }
    });
  }
  delete(id: number) {
    Swal.fire({
      title: 'Quieres eliminar este platillo?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
         this.dishService.deletetDishes(id).subscribe((res) => {
          if (res) {
            this.getDishes();
            Swal.fire('Eliminado!', '', 'success');
          } else {
            Swal.fire('Ocurrio un error!', '', 'warning');
          }
        });
      }
    });
  }

  getDishes() {
    this.dishService.getAllDishes(0).subscribe((data) => {
      this.dishes = data;
    });
  }

 
}
