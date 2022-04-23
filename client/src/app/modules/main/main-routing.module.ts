import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from 'src/app/main/pages/information/about/about.component';
import { AuthGuard } from 'src/app/providers/guards/auth.guard';
import { CartComponent } from 'src/app/main/pages/user/cart/cart.component';
import { ContactComponent } from 'src/app/main/pages/information/contact/contact.component';
import { EditprofileComponent } from 'src/app/main/pages/user/editprofile/editprofile.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from 'src/app/main/pages/user/orders/orders.component';
import { ProductDetailsComponent } from 'src/app/main/pages/product-details/product-details.component';
import { ProfileComponent } from 'src/app/main/pages/user/profile/profile.component';
import { ReturnComponent } from 'src/app/main/pages/policy/return/return.component';
import { ShippingComponent } from 'src/app/main/pages/policy/shipping/shipping.component';
import { TermsComponent } from 'src/app/main/pages/policy/terms/terms.component';
import { UserAuthComponent } from 'src/app/main/pages/user/user-auth/user-auth.component';
import { WishlistComponent } from 'src/app/main/pages/user/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'policy',
    children: [
      { path: 'return', component: ReturnComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'terms', component: TermsComponent },
    ],
  },
  {
    path: 'information',
    children: [
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  {
    path: 'user',
    children: [
      { path: 'register', component: UserAuthComponent },
      { path: 'login', component: UserAuthComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editprofile',
        component: EditprofileComponent,
        canActivate: [AuthGuard],
      },
      { path: 'wishlist', component: WishlistComponent },
      {
        path: 'cart',
        children: [
          { path: '', component: CartComponent },
          // {path:"editCartItem/:cartItemId", component:EditCartItemComponent}
        ],
      },
      { path: 'orders', component: OrdersComponent },
    ],
  },
  { path: 'products/:productId', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
export const routingComponents = [
  ReturnComponent,
  ShippingComponent,
  TermsComponent,
  ContactComponent,
  AboutComponent,
  UserAuthComponent,
  ProfileComponent,
  EditprofileComponent,
  WishlistComponent,
  CartComponent,
  OrdersComponent,
  ProductDetailsComponent,
];
