import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { SaleComponent } from './sale/sale.component';
import { ProviderComponent } from './prov/provider.component';
import { SubsidiaryComponent } from './company/subsidiary/subsidiary.component';
import { ProductComponent } from './product/product.component';
import { PackageComponent } from './package/package.component';
import { FrmPackageComponent } from './package/frm-package/frm-package.component';
import { OrderComponent } from './order/order.component';
import { CurrentMenuComponent } from './current-menu/current-menu.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'sale', component: SaleComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'provider', component: ProviderComponent },
      { path: 'product', component: ProductComponent },
      { path: 'subsidiary', component: SubsidiaryComponent },
      { path: 'package', component: PackageComponent },
      { path: 'frmPackage/:id', component: FrmPackageComponent },
      { path: 'order', component: OrderComponent },
      {path:'currentMenu',component:CurrentMenuComponent}
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
