import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CommonHttpService } from './shared/common-http.service';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MasterService } from './services/master.service';
import { KbarticlesService } from './services/appservices/kbarticles.service';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    HttpModule,
    ReactiveFormsModule,
    ToastModule,
    NgHttpLoaderModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
  ],
  providers: [
    CommonHttpService,
    KbarticlesService,
    MessageService,
    MasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
