import { RouterModule, Routes } from '@angular/router';

import { AdminAuthComponent } from 'src/app/admin/pages/admin-auth/admin-auth.component';
import { AdminAuthGuard } from 'src/app/providers/guards/admin-auth.guard';
import { AdminOrdersComponent } from 'src/app/admin/pages/admin-orders/admin-orders.component';
import { AlladminsComponent } from 'src/app/admin/pages/admins/alladmins/alladmins.component';
import { AllusersComponent } from 'src/app/admin/pages/users/allusers/allusers.component';
import { EditProductComponent } from 'src/app/admin/pages/products/edit-product/edit-product.component';
import { HomeAdminComponent } from 'src/app/admin/pages/home-admin/home-admin.component';
import { NgModule } from '@angular/core';
import { ProductsAdminComponent } from 'src/app/admin/pages/products/products.component';
import { SingleProductComponent } from 'src/app/admin/pages/products/single-product/single-product.component';
import { SingleuserComponent } from 'src/app/admin/pages/users/singleuser/singleuser.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    children: [
      { path: 'register', component: AdminAuthComponent },
      { path: 'login', component: AdminAuthComponent },
      {
        path: 'users',
        children: [
          { path: '', component: AllusersComponent },
          { path: 'singleUser/:userId', component: SingleuserComponent },
        ],
      },
      {
        path: 'admins',
        children: [{ path: '', component: AlladminsComponent }],
      },
      {
        path: 'products',
        children: [
          { path: '', component: ProductsAdminComponent },
          {
            path: 'singleProduct/:productId',
            component: SingleProductComponent,
          },
          { path: 'editProduct/:productId', component: EditProductComponent },
        ],
      },
      {
        path: 'orders',
        children: [{ path: '', component: AdminOrdersComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
export const routingComponents = [
  HomeAdminComponent,
  AdminAuthComponent,
  AllusersComponent,
  SingleuserComponent,
  AlladminsComponent,
  AdminOrdersComponent,
  EditProductComponent,
  ProductsAdminComponent,
  SingleProductComponent,
];
