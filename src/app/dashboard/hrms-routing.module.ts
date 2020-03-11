import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LeaveComponent } from './leave/leave.component';
import { HolidaylistComponent } from './holidaylist/holidaylist.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'holidaylist', component: HolidaylistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HrmsRoutingModule { }
