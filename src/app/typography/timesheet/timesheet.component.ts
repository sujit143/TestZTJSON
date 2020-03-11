import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  showTabs;

  opened = false;
  filterStatus = false;
  openTab() {
    this.opened = true;
  }
  openTab2() {
    this.filterStatus = true;
  }


  constructor() { }

  ngOnInit() {
    this.showTabs = {
      'one': true,
      'three': true
    };
  }
}

