import { AdminAuthGuard } from './providers/guards/admin-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './admin/pages/register/register.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/information/about/about.component';
import { ContactComponent } from './pages/information/contact/contact.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ReturnComponent } from './pages/policy/return/return.component';
import { ShippingComponent } from './pages/policy/shipping/shipping.component';
import { TermsComponent } from './pages/policy/terms/terms.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SignUpComponent } from './pages/user/sign-up/sign-up.component';
import { ProfileComponent } from './pages/user/profile/profile.component';

import { EditprofileComponent } from './pages/user/editprofile/editprofile.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { EditCartItemComponent } from './pages/user/cart/edit-cart-item/edit-cart-item.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { HomeAdminComponent } from './admin/pages/home-admin/home-admin.component';
import { AuthGuard } from './providers/guards/auth.guard';
import { SingleuserComponent } from './admin/pages/users/singleuser/singleuser.component';
import { OrdersComponent } from './pages/orders/orders.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { SingleProductComponent } from './admin/pages/products/single-product/single-product.component';
import { EditProductComponent } from './admin/pages/products/edit-product/edit-product.component';
import { AdminOrdersComponent } from './admin/pages/admin-orders/admin-orders.component';
=======
import { AdminOrdersComponent } from './admin/pages/admin-orders/admin-orders.component';
>>>>>>> 98beb339f236734281201940621e8b83a567f71c
=======
import { SingleProductComponent } from './admin/pages/products/single-product/single-product.component';
import { EditProductComponent } from './admin/pages/products/edit-product/edit-product.component';
import { AdminOrdersComponent } from './admin/pages/admin-orders/admin-orders.component';
>>>>>>> 81d1a6db378c12e7afa2b0090d4b1a9d71bd3f17

const routes: Routes = [
{path:"",component:HomeComponent},
{path:'user',children:[
  {path:"register",component:SignUpComponent},
  {path:"login", component:LoginComponent},
  {path:"profile",component:ProfileComponent ,canActivate:[AuthGuard]},
  {path:"editprofile",component:EditprofileComponent ,canActivate:[AuthGuard]},
  {path:"wishlist", component:WishlistComponent},
  {path:"cart", children:[
    {path:"", component:CartComponent},
    // {path:"editCartItem/:cartItemId", component:EditCartItemComponent}
  ]},
  {path:"orders", component:OrdersComponent}
]},
{path:"products/:productId",component:ProductDetailsComponent},
{path:"policy",children:[
  {path:"return",component:ReturnComponent},
  {path:"shipping",component:ShippingComponent},
  {path:"terms",component:TermsComponent}
]},
{path:'information',children:[
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
]},
{path:"admin",children:[
  {path:"",component:HomeAdminComponent,canActivate:[AdminAuthGuard]},
  {path:"register",component:RegisterComponent},
  {path:"users",children:[
    {path:"singleUser/:userId",component:SingleuserComponent}
  ]},
  {path:"products",children:[
    {path:"singleProduct/:productId",component:SingleProductComponent},
    {path:"editProduct/:productId",component:EditProductComponent}
  ]}
  {path:"orders", component:AdminOrdersComponent}
]},
{path:"orders", component:AdminOrdersComponent},
{path:"**",component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
