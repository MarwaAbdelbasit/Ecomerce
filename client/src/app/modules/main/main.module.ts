import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule, routingComponents } from './main-routing.module';

import { CommonModule } from '@angular/common';
import { FooterBottomComponent } from 'src/app/main/layout/footer/footer-bottom/footer-bottom.component';
import { FooterComponent } from 'src/app/main/layout/footer/footer.component';
import { FooterMiddleComponent } from 'src/app/main/layout/footer/footer-middle/footer-middle.component';
import { FooterTopComponent } from 'src/app/main/layout/footer/footer-top/footer-top.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from 'src/app/main/layout/layout.component';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from 'src/app/main/layout/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';
import { ReviewComponent } from 'src/app/main/pages/product-details/review/review.component';
import { SidebarComponent } from 'src/app/main/pages/user/sidebar/sidebar.component';
import { SwiperModule } from 'swiper/angular';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@NgModule({
  declarations: [
    routingComponents,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    FooterTopComponent,
    FooterBottomComponent,
    FooterMiddleComponent,
    ReviewComponent,
    ToastComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MainRoutingModule,
    HttpClientModule,
    SwiperModule,
    RatingModule,
  ],
  bootstrap: [LayoutComponent],
})
export class MainModule {}
