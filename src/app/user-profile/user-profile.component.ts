import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { KbarticlesService } from './../services/appservices/kbarticles.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { KBArticles } from '../Models/kbarticles';
import { Pagerinfo } from '../Models/pagerinfo';
import { DdlCatogoryName } from '../Models/ddlcategory';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit, OnDestroy {


  selectedAnswer: any = [];
  category_disp: DdlCatogoryName[];
  length: number;
  norecordfound: boolean = false;
  message: string;
  show = false;
  arr: KBArticles[] = [];
  artcle: KBArticles[];
  article: KBArticles[];
  show_add_article: boolean = false;
  all_articles: any;
  ddl_category_list: DdlCatogoryName[];
  page: Pagerinfo;
  Page: number = 1;
  Categoryid: number = 0;
  value: string = '';
  pageVariable: boolean = false;
  totalItem: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  firstvalue: number;
  secondvalue: number;
  queryParamsObject: any = {};
  private _subscriptions = new Subscription();
  isFlag: boolean = false;
  subscrip: Subscription;
  categoryList: any;
  number: number;
  id: number;
  showcheckbox: boolean = false;
  checked: false;

  constructor(
    private router: Router,
    private act: ActivatedRoute,
    private _data: KbarticlesService,
    private messageService: MessageService,
    private localStorage: LocalStorageService
  ) {
    this._subscriptions.add (
      this.router.routerState.root.queryParams.subscribe (
        (params: Params) => {
          this.queryParamsObject = params;
          this.Page = this.queryParamsObject.pagenumber;
          if (this.Page === undefined) {
            this.Page = 1;
          }
          // this.onLoad(this.Page);
        }
      )
    );
  }

  ngOnInit() {
    console.log(this.value);
    this.getPageInfo();
    this._subscriptions.add (
      this._data.userActivated.subscribe (
        (id: boolean) => {
          if (id === true) {
            this.isFlag = true;
            this.getAdminArticles();
          } else {
            this.isFlag = false;
            this.getArticles();
          } () => {
            this.messageService.add ({
              severity: 'error',
              summary: 'Error',
              detail: 'Server not responding'
            });
          };
        }
      )
    );

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

  getPageInfo() {
    this._data.getAllKbArticle().subscribe (
      (data: KBArticles[]) => {
        this.arr = data;
        console.log(this.arr);
        console.log(this.arr['ddlCatogoryNames']);
        this.ddl_category_list = this.arr['ddlCatogoryNames'];
        this.pageVariable = true;
        this.page = data['pagerInfo'];
        this.firstvalue = 1;
        this.secondvalue = 10;
        this.totalItem = this.page.totalItems;
        this.totalPages = this.page.totalPages;
        this.totalItems = this.page.itemsPerPage * this.Page;
        this.currentPage = this.page.currentPage;
        this.all_articles = this.arr['kbArticles'];
        this.article = this.artcle;
      },
      error => {
       this.norecordfound = true;
      },
      function() {

      }
    );
  }

  getArticles() {
    this._data.getAllKbArticle().subscribe (
      (data: KBArticles[]) => {
        this.arr = data;
        this.page = data['pagerInfo'];
        this.totalItem = this.page.totalItems;
        this.totalPages = this.page.totalPages;
        this.totalItems = this.page.itemsPerPage;
        this.all_articles = this.arr['kbArticles'];
      },
      function(error) {
        console.log('error');
      },
      function() {
      }
    );
    var req = {
      pagenumber: this.queryParamsObject.pagenumber
    };
    this.router.navigate(['/user-profile'], { queryParams: req });
  }

  onReadMore(item) {
    this.messageService.add ({
      severity: 'warn',
      summary: 'Warn Message',
      detail: 'There are unsaved changes'
    });
    this.router.navigate(['/readmore'], { queryParams: { ArticleId: item.articleId }});
  }

  onEditArticle(item) {
    this.router.navigate(['/edit'], { queryParams: { ArticleId: item.articleId }});
  }

// --------------------------- search --------------------------
  onSearchClick(value) {
    this.value = value;
    if (value !== '') {
      this._data.getArticleBySearch(value).subscribe (
        (data: KBArticles[]) => {
          window.scroll(0, 0);
          this.arr = data;
          this.page = data['pagerInfo'];
          this.totalItem = this.page.totalItems;
          this.totalPages = this.page.totalPages;
          this.totalItems = this.page.itemsPerPage * this.Page;
          this.currentPage = this.page.currentPage;
          if (this.totalItem >= 10) {
            this.secondvalue = this.totalItems;
          } else {
            this.secondvalue = this.totalItem;
          }
          this.all_articles = this.arr['kbArticles'];
        }
      );
    } else {
      this._data.getAllKbArticle().subscribe (
        (data: KBArticles[]) => {
          this.arr = data;
          window.scroll(0, 0);
          this.all_articles = this.arr['kbArticles'];
          this.article = this.artcle;
        }
      );
      this.secondvalue = this.totalItems;
      this.getArticles();
    }
  }

  onFilterCheck(category) {
    console.log(category);
    if (category.isCheck === false) {
      category.isCheck = true;
    } else {
      category.isCheck = false;
    }
    this.selectedAnswer.push(category);
    this.selectedAnswer = _.filter(this.selectedAnswer, s => {
      return s.isCheck === true;
    });
    if (this.value !== '') {
      console.log(this.value);
      this._data.getfiltersearch(category.categoryId,this.value).subscribe(
        (data:any[])=>{
          // this.arr = data;
          this.all_articles = data['kbArticles'];
        }
      );
    }else{


    this.categoryList = this.selectedAnswer;
    this._data.getAllKbArticle().subscribe (
      (data: KBArticles[]) => {
        this.arr = data;
        this.all_articles = this.arr['kbArticles'];
        if (this.categoryList.length > 0) {
          this.all_articles = _.filter (
            this.all_articles, a => {
              const test1 = _.find (
                this.categoryList, c => {
                  if (c.categoryId === a.categoryId) {
                    return a;
                  }
                }
              );
              return test1;
            }
          );
          this.secondvalue = this.all_articles.length;
          this.article = this.all_articles;
        }
      },
      function(error) {
        alert(error);
      },
      function() {}
    );
   }
  }

  getAdminArticles() {
    this._data.getAdminArticles(this.Page).subscribe (
      (data: KBArticles[]) => {
        this.arr = data;
        this.page = data['pagerInfo'];
        this.totalItem = this.page.totalItems;
        this.totalPages = this.page.totalPages;
        this.totalItems = this.page.itemsPerPage * this.Page;
        this.currentPage = this.page.currentPage;
        this.all_articles = this.arr['kbArticles'];
    });
  }

  loadPage(event) {
    this.number = event.page + 1;
    if (this.number !== 1 && this.number <= this.totalPages) {
      this.firstvalue = this.number * this.totalItems - 9;
      this.secondvalue = this.firstvalue + 9;
    } else {
      this.firstvalue = 1;
      this.secondvalue = 10;
    }
    if (this.number !== 0) {
      this._data.getPageByNumber(this.number, this.Categoryid, this.value).subscribe (
        (data: KBArticles[]) => {
          this.arr = data;
          window.scroll(0, 0);
          this.all_articles = this.arr['kbArticles'];
          if (this.categoryList !== undefined) {
            if (this.categoryList.length > 0) {
              this.all_articles = _.filter (
                this.all_articles, a => {
                  const test1 = _.find (
                    this.categoryList, c => {
                      if (c.categoryId === a.categoryId) {
                        return a;
                      }
                    }
                  );
                  return test1;
                }
              );
              this.article = this.all_articles;
            }
          }
        }
      );
      // var req = {
      //   pagenumber: number
      // };
      // this.router.navigate(['/user-profile'], { queryParams: req });
    }
  }

  onLoad(number: number) {
    console.log('pageLoad');
    var req = {
      pagenumber: number
    };
    this.router.navigate(['/user-profile'], { queryParams: req });
  }

  onShowClick() {
    _.forEach(this.category_disp, a => {
      a.isCheck = false;
    });
    this.getArticles();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  myArticleCheckedUnchecked(e) {
    if (e.target.checked) {
      this.getAdminArticles();
    } else {
      this.getArticles();
    }
  }


}
