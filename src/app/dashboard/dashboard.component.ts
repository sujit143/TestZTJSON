import { Component, OnInit , ViewChild} from '@angular/core';
import { MatExpansionPanel } from '@angular/material';

import * as Chartist from 'chartist';
import { MessageService, Message } from 'primeng/api';

import { AppservicesService } from './../services/appservices.service';
import { Member } from '../Models/dashboard';
import { Department } from '../Models/department';
import { HttpClient } from '@angular/common/http';

export class Country1 {
  Leave: string;
  Requested: string;
  Applied: string;
  Status:string;
  Sent:string;

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild('MatExpansionPanel',  {static: true}) MatExpansionPanel: MatExpansionPanel;

  arrlogin: Member;
  arrdept: Department;
  msgs: Message[] = [];
  countries:any;

  constructor(private _data: AppservicesService,private messageService: MessageService,private http:HttpClient ) {}

  ngOnInit() {
    this._data.getMember().subscribe (
      (data: Member) => {
        console.log(data);
        this.arrlogin = data['memberDetails'];
        var result = this.arrlogin['associatedDepartments'][0];
        this.arrdept = result;
        console.log(this.arrlogin);
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong' });
      }
    );
    this._data.getCountry().subscribe(data=>{
      console.log(data);
      let data1:any=[];
      for(let i=0;i<=3;i++){
       data1[i]=data[i];
      }
      this.countries=data1;
      console.log(data1);
     })
  }
}
