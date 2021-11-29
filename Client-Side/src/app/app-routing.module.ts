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

const routes: Routes = [
{path:"",component:HomeComponent},
{path:'user',children:[
  {path:"register",component:SignUpComponent},
  {path:"login", component:LoginComponent},
  {path:"profile",component:ProfileComponent},
  {path:"editprofile",component:EditprofileComponent},
  {path:"cart",component:CartComponent},
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
  {path:"register",component:RegisterComponent}
]},
{path:"**",component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
