import { ReadmoreComponent } from './../../user-profile/readmore/readmore.component';
import { EditarticleComponent } from './../../user-profile/editarticle/editarticle.component';
import { SearchComponent } from './../../search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddarticleComponent } from '../../user-profile/addarticle/addarticle.component';
import { EditorModule } from 'primeng/editor';
import {  MatExpansionModule } from '@angular/material';
import { GrowlModule } from 'primeng/growl';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { Base64EncodeDecode } from '../../../app/shared/base64-encode-decode';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';

// import { HolidaylistComponent } from '../../dashboard/holidaylist/holidaylist.component';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    EditorModule,
    GrowlModule,
    ToastModule,
    MatExpansionModule,
    CardModule,
    CheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatButtonToggleModule,
    PaginatorModule,
    PanelModule

  ],
  declarations: [

    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    // HolidaylistComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    SearchComponent,
    AddarticleComponent,
    EditarticleComponent,
    ReadmoreComponent
  ],
  providers: [Base64EncodeDecode,MessageService]
})

export class AdminLayoutModule {}
