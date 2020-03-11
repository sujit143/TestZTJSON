import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import holidaylist from '../../../assets/holidaylist.json';
import { AppservicesService } from '../../services/appservices.service';



@Component({
  selector: 'app-holidaylist',
  templateUrl: './holidaylist.component.html',
  styleUrls: ['./holidaylist.component.scss']
})
export class HolidaylistComponent implements OnInit {

  countries:any;
  constructor(private http:HttpClient,private _data: AppservicesService){}
  ngOnInit(){
    this._data.getHolidayList().subscribe(data=>{
      console.log(data);
      this.countries=data;
      console.log(this.countries);
     })
  }

}
