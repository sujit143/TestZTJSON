import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatToolbarModule, MatSidenavModule } from '@angular/material';

import { NgbCarouselModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

import { CommonHttpService } from './../shared/common-http.service';
import { AppservicesService } from './../services/appservices.service';
import { LeaveComponent } from './leave/leave.component';
import { HrmsRoutingModule } from './hrms-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HolidaylistComponent } from './holidaylist/holidaylist.component';
// import { DashboardRoutingModule } from './dashboard-routing.module';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AccordionModule} from 'primeng/accordion';
@NgModule({
  declarations: [
    LeaveComponent,
    DashboardComponent,
    HolidaylistComponent
  ],

  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule,
    // DashboardRoutingModule,
    // StatModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    ToastModule,
    TableModule,
    CardModule,
    HttpModule,
    HttpClientModule,
    MatExpansionModule,
    HrmsRoutingModule,
    FormsModule,
    NgbModule,
    OverlayPanelModule,
    AccordionModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class DashboardModule { }
