import { Component, OnInit } from '@angular/core';

import country from '../../../assets/country.json';
import { HttpClient } from '@angular/common/http';
import { AppservicesService } from '../../services/appservices.service';

//import { HttpClientModule } from '@angular/common/http';
export class Country1 {
  Leave: string;
  Requested: string;
  Applied: string;
  Status:string;
  Sent:string;

}

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  a: number = Math.floor(Math.random() * 6) + 1;
  b = Math.floor(Math.random() * 6) + 1;
  c = Math.floor(Math.random() * 6) + 1;
  e = Math.floor(Math.random() * 6) + 1;
  panelOpenState = false;
  model1: any;
  model2: any;
  placement = 'bottom-center';
  countries:any;
  constructor(private http:HttpClient , private _data:AppservicesService ) {}

  ngOnInit() {

    this._data.getCountry().subscribe(data=>{
     console.log(data);
     this.countries=data;
     console.log(this.countries);
    })
  }
}
