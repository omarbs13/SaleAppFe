import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProvider } from 'src/app/interface/DialogData ';
import { ExpensesModel } from 'src/app/interface/user.mode';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styles: [],
})
export class ExpensesListComponent implements OnInit {
  titleModal: string = '';
  expenses: ExpensesModel[] = [];
  prividerId:number=0;
  constructor(
    public dialogRef: MatDialogRef<ExpensesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProvider,
    private providerService: ProviderService
  ) {
    dialogRef.disableClose = true;
    this.data.success = false;    
    this.prividerId=this.data.id;
    this.titleModal = this.data.providerName;
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancel();
      }
    });
    this.getExpenses(this.prividerId);
  }

  onCancel(): void {
    this.data.success = false;
    this.dialogRef.close(this.data);
  }
  getExpenses(id:number) {
    this.providerService.getAllExpenses(id).subscribe((x) =>{ this.expenses = x;  });
  }
}
