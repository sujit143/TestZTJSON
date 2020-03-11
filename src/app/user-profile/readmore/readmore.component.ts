import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params } from '@angular/router';

import { KbarticlesService } from './../../services/appservices/kbarticles.service';
import { KBArticles } from '../../Models/kbarticles';

import { Subscription } from 'rxjs';
import _ from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.scss']
})

export class ReadmoreComponent implements OnInit, OnDestroy {

  public queryparams: any;
  read_more: KBArticles;
  isAdmin: boolean = false;

  private _subscriptions = new Subscription();

  constructor(
    private router: Router,
    private _data: KbarticlesService,
    private messageService:MessageService,
    private _router:Router) {
    this._subscriptions.add(
      this.router.routerState.root.queryParams.subscribe(
        (params: Params) => {
          this.queryparams = params['ArticleId'];
        }
      )
    );
  }

  ngOnInit() {
    this.getByArticleId();
  }

  getByArticleId() {
    var req = {
      ArticleId: this.queryparams
    };
    console.log(req);
    this._data.getArticleById(req).then(
      res => {
        if (res) {
          if (!_.isEmpty(res)) {
            this.read_more = res;
            console.log(this.read_more);
          } else {
            this.read_more;
            console.log('failed');
            return false;
          }
        }
      }, error => {
      }
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  onEditArticle(item) {
    this.router.navigate(['/edit'], { queryParams: { ArticleId: item.articleId } });
  }
  onClickClose() {
    this.messageService.add({
      severity: 'error',
      detail: 'Prcossing'
    });
    this._router.navigate(['/user-profile']);
  }
}
