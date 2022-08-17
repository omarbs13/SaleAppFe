import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogInventory } from 'src/app/interface/DialogData ';
import { InventoryModel } from 'src/app/interface/user.mode';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styles: [],
})
export class InventoryModalComponent implements OnInit {
  titleModal: string = '';
  isNew: boolean = true;

  productForm: FormGroup = new FormGroup({
    inventoryId: new FormControl(''),
    productId: new FormControl(''),
    minimumStock: new FormControl(''),
    currentStock: new FormControl(''),
    inventoryTypeId: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<InventoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInventory,
    private inventoryService: InventoryService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;
    this.isNew = data.inventory ==null;
    this.titleModal = data.productName;
    if (!this.isNew) {
      this.inventoryService.get(data.inventory.inventoryId).subscribe((res) => {
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
      this.inventoryService
        .post(this.productForm.value)
        .subscribe((data: any) => {
          if (data.success) {
            this.data.success = true;
            this.dialogRef.close(this.data);
          }
        });
    }
    if (!this.isNew) {
      this.inventoryService
        .put(this.productForm.value)
        .subscribe((data: any) => {
          if (data.success) {
            this.data.success = true;
            this.dialogRef.close(this.data);
          }
        });
    }
  }

  get minimumStock() {
    return this.productForm.get('minimumStock');
  }
  get currentStock() {
    return this.productForm.get('currentStock');
  }

  createForm(item?: InventoryModel) {
    let id = item ? item.inventoryId : 0;
    let type = item ? 1 : 3;
    this.productForm = new FormGroup({
      inventoryId: new FormControl(id),
      productId: new FormControl(this.data.id),
      minimumStock: new FormControl(item?.minimumStock, Validators.required),
      currentStock: new FormControl(item?.currentStock, Validators.required),
      inventoryTypeId: new FormControl(type),
      user: new FormControl('admin'),
    });
  }
}
