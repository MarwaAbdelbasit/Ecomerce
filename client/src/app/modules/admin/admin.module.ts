import { AdminRoutingModule, routingComponents } from './admin-routing.module';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { SidebarAdminComponent } from '../../admin/layout/sidebar-admin/sidebar-admin.component';
import { TopbarComponent } from '../../admin/layout/topbar-admin/topbar.component';

@NgModule({
  declarations: [routingComponents, TopbarComponent, SidebarAdminComponent],
  imports: [CommonModule, MaterialModule, AdminRoutingModule],
})
export class AdminModule {}
