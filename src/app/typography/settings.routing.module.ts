import { DocumentComponent } from './../typography/document/document.component';
import { UsersComponent } from './../typography/users/users.component';
import { OrganizationComponent } from './../typography/organization/organization.component';
import { LocationComponent } from './../typography/location/location.component';
import { DesignationComponent } from './../typography/designation/designation.component';
import { TypographyComponent } from './typography.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { Location } from '@angular/common';
import { TimesheetComponent } from './timesheet/timesheet.component';



const routes: Routes = [
    {
        path: '', component: TypographyComponent
    },
    {
      path: 'department', component: DepartmentComponent
    },
    {
      path: 'designation', component: DesignationComponent
    },
    {
      path: 'location', component: LocationComponent
    },
    {
      path: 'organization', component: OrganizationComponent
    },
    {
      path: 'user', component: UsersComponent
    },
    {
      path: 'document', component: DocumentComponent
    },
    {
      path: 'timesheet', component: TimesheetComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
