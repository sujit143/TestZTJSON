import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatMenuModule, MatButtonModule, MatExpansionModule } from '@angular/material/';

import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import { TimesheetComponent } from '../typography/timesheet/timesheet.component';
import { DepartmentComponent } from './department/department.component';
import { SettingsRoutingModule } from './settings.routing.module';
import { SharedModuleModule } from './../shared/shared.module';
import { TypographyComponent } from './typography.component';
import { DocumentComponent } from '../typography/document/document.component';
import { UsersComponent } from '../typography/users/users.component';
import { LocationComponent } from '../typography/location/location.component';
import { OrganizationComponent } from '../typography/organization/organization.component';
import { DesignationComponent } from '../typography/designation/designation.component';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    GrowlModule,
    ConfirmDialogModule,
    NgbModule,
    SidebarModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    AutoCompleteModule,
    PanelModule,
    TabViewModule,
    PaginatorModule,
    ToastModule,
    ReactiveFormsModule,
    ToolbarModule,
    ProgressBarModule

  ],
  declarations: [
    TypographyComponent,
    DesignationComponent,
    OrganizationComponent,
    LocationComponent,
    UsersComponent,
    DocumentComponent,
    DepartmentComponent,
    TimesheetComponent
  ],
  providers: [
    ConfirmationService,
    DatePipe
  ]
})
export class SettingsModule { }
