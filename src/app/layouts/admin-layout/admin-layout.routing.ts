import { Routes } from '@angular/router';
import { ReadmoreComponent } from './../../user-profile/readmore/readmore.component';
import { EditarticleComponent } from './../../user-profile/editarticle/editarticle.component';


import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddarticleComponent } from '../../user-profile/addarticle/addarticle.component';
import { DepartmentComponent } from '../../typography/department/department.component';
// import { HolidaylistComponent } from '../../dashboard/holidaylist/holidaylist.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      loadChildren: '../../dashboard/dashboard.module#DashboardModule' },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     loadChildren: '../../typography/settings.module#SettingsModule'},
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    {path:  'add',            component: AddarticleComponent},
    {path:  'edit',           component:EditarticleComponent},
    {
      path:'readmore',component:ReadmoreComponent
    },
    // {
    //   path:'holilist',component:HolidaylistComponent
    // }
];
