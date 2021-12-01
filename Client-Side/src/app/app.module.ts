import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { SwiperModule } from "swiper/angular";
import { RatingModule } from 'ng-starrating';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterTopComponent } from './components/layout/footer/footer-top/footer-top.component';
import { FooterMiddleComponent } from './components/layout/footer/footer-middle/footer-middle.component';
import { FooterBottomComponent } from './components/layout/footer/footer-bottom/footer-bottom.component';
import { Error404Component } from './pages/error404/error404.component';
import { TermsComponent } from './pages/policy/terms/terms.component';
import { ShippingComponent } from './pages/policy/shipping/shipping.component';
import { ReturnComponent } from './pages/policy/return/return.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { SignUpComponent } from './pages/user/sign-up/sign-up.component';
import { ProductsComponent } from './pages/home/products/products.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './admin/pages/register/register.component';
import { UserInterceptorInterceptor } from './providers/interceptors/user-interceptor.interceptor';
import { ReviewComponent } from './pages/product-details/review/review.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { EditprofileComponent } from './pages/user/editprofile/editprofile.component';
import { SidebarComponent } from './pages/user/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCartItemComponent } from './pages/user/cart/edit-cart-item/edit-cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    NavbarComponent,
    ProductDetailsComponent,
    CartComponent,
    OrdersComponent,
    WishlistComponent,
    AboutComponent,
    ContactComponent,
    FooterTopComponent,
    FooterMiddleComponent,
    FooterBottomComponent,
    Error404Component,
    TermsComponent,
    ShippingComponent,
    ReturnComponent,
    SignUpComponent,
    ProductsComponent,
    RegisterComponent,
    LoginComponent,
    ReviewComponent,
    ProfileComponent,
    EditprofileComponent,
    SidebarComponent,
    EditCartItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    RatingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
    useClass: UserInterceptorInterceptor,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
