import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatInputModule,} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
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
import { CustomerModalComponent } from './customer/customer-modal/customer-modal.component';
import { CompanyComponent } from './company/company.component';
import { SubsidiaryComponent } from './company/subsidiary/subsidiary.component';
import { SubsidiaryModalComponent } from './company/subsidiary/subsidiary-modal/subsidiary-modal.component';
import { ProductComponent } from './product/product.component';
import { ProductModalComponent } from './product/product-modal/product-modal.component';
import { InventoryModalComponent } from './product/inventory-modal/inventory-modal.component';
import { PackageComponent } from './package/package.component';
import { FrmPackageComponent } from './package/frm-package/frm-package.component';

const materialModules = [
/*   MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule, */
  MatDialogModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
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
    CustomerModalComponent,
    CompanyComponent,
    SubsidiaryComponent,
    SubsidiaryModalComponent,
    ProductComponent,
    ProductModalComponent,
    InventoryModalComponent,
    PackageComponent,
    FrmPackageComponent,
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
