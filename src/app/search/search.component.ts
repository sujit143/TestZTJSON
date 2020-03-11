import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { KbarticlesService } from './../services/appservices/kbarticles.service';
import { DdlCatogoryName } from '../Models/ddlcategory';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  @Output() emit1 = new EventEmitter();
  @Output() emit2 = new EventEmitter();
  @Output() myarticleChecked = new EventEmitter();
  @Output() myarticleUnchecked = new EventEmitter();
  @Output() emit3 = new EventEmitter();

  selectedAnswer: any = [];
  id: number;
  category_disp: DdlCatogoryName[];
  showcheckbox: boolean = false;
  subscrip: Subscription;
  isFlag: boolean = false;
  categoryList: any;
  constructor(
    private _data: KbarticlesService,
    private actroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._data.getCategory().subscribe((data: DdlCatogoryName[]) => {
      _.forEach(data, d => {
        d.isCheck = false;
      });
      this.category_disp = _.cloneDeep(data);
      console.log(this.category_disp);
    });


    this.subscrip = this._data.userActivated.subscribe((id: boolean) => {
      if (id === true) {
        this.isFlag = true;
      } else {
        this.isFlag = false;
      }
    });
  }

  showall() {
    _.forEach(this.category_disp, a => {
      a.isCheck = false;
    });
    this.emit3.emit();
  }

  updateCheckedOptions(category) {
    if (category.isCheck === false) {
      category.isCheck = true;
    } else {
      category.isCheck = false;
    }
    this.selectedAnswer.push(category);
    this.selectedAnswer = _.filter(this.selectedAnswer, s => {
      return s.isCheck === true;
    });
    console.log(this.selectedAnswer);
    this.emit1.emit(this.selectedAnswer);
  }

  onSearchClick(searchTerm) {
    this.emit2.emit(searchTerm);
    console.log(searchTerm);
  }

  myArticleCheckedUnchecked(e) {
    if (e.target.checked) {
      this.myarticleChecked.emit(e);
    } else {
      this.myarticleUnchecked.emit();
    }
  }
}
