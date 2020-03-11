import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// bank
import { Routes, RouterModule } from '@angular/router';
import { PageHeaderComponent } from './modules/page-header/page-header.component';
// import {  SimpleLineIconsComponent } from '../shared/components/icons/simple-line-icons.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
      ],
  declarations: [
    
  PageHeaderComponent],
  providers: [
  ],
  exports:
  [
  ]
})
export class SharedModuleModule { }
