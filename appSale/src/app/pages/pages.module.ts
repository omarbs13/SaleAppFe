import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProviderComponent } from './provider/provider.component';
import { SaleComponent } from './sale/sale.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DataTablesModule } from 'angular-datatables';
import {MatDialogModule} from '@angular/material/dialog';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';
const materialModules = [
/*   MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule, */
  MatDialogModule
];

@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent,
    ProviderComponent,
    SaleComponent,
    UserComponent,
    PagesComponent,
    UserModalComponent,
  ],
  imports: [CommonModule, RouterModule,DataTablesModule,materialModules,FormsModule,ReactiveFormsModule],
  exports: [
    CustomerComponent,
    DashboardComponent,
    ProviderComponent,
    SaleComponent,
    UserComponent,
    PagesComponent,materialModules
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[MethodsHttpProvider]
})
export class PagesModule {}
