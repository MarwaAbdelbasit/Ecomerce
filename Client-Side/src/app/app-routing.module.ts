import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { ReturnComponent } from './pages/policy/return/return.component';
import { ShippingComponent } from './pages/policy/shipping/shipping.component';
import { TermsComponent } from './pages/policy/terms/terms.component';

const routes: Routes = [
{path:"",component:HomeComponent},
{path:"policy",children:[
  {path:"return",component:ReturnComponent},
  {path:"shipping",component:ShippingComponent},
  {path:"terms",component:TermsComponent}
]},
{path:"**",component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
