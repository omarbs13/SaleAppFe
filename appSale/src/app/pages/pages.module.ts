import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProviderComponent } from './prov/provider.component';
import { SaleComponent } from './sale/sale.component';
import { UserComponent } from './user/user.component';

import { PagesComponent } from './pages.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';
import { ProviderModalComponent } from './prov/provider-modal/provider-modal.component';

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
    ProviderModalComponent,
  ],
  imports: [CommonModule, RouterModule,materialModules,FormsModule,ReactiveFormsModule,TableModule],
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
