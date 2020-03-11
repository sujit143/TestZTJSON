import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {Subject} from 'rxjs';

import { AppConstant } from './../../app.constant';
import { CommonHttpService } from './../../shared/common-http.service';

@Injectable({
  providedIn: 'root'
})

export class KbarticlesService {

  api_url: string;
  appendpoint: string;
  ReadMore_URL: string;
  cpDefaultUrl: string;
  cpDefaultUpdateUrl: string;
  Edit_Fetch_URL: string;
  CAT_URL: string;
  INSERT_URL: string;
  Search_article: string;
  GetAllArticles: string;
  GETCATEGORIESBYID: string;
  GETADMINARTICLES: string;
  PAGINATION: string;
  FilterSearch:string;
  Concat: string;
  currentUser;
  redirectURL: string;
  userActivated = new Subject();

  constructor (
      private http: HttpClient, public router: Router,
      private commonHttpService: CommonHttpService,
      private _router: Router
    ) {
    this.api_url = AppConstant.API_ENDPOINT;
      this.appendpoint = this.api_url;
      this.ReadMore_URL = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.READMORE;
      this.Edit_Fetch_URL = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.FETCHARTICLEBYID;

      this.CAT_URL = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.GETCATEGORIES;
      this.INSERT_URL = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.INSERTARTICLE;
      this.Search_article = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.SEARCHARTICLE;
      this.GetAllArticles = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.GETALLARTICLE;
      this.GETADMINARTICLES = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.GETADMINARTICLES;
      this.GETCATEGORIESBYID = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.GETARTICLEBYID;
      this.PAGINATION = this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.PAGINATION;
      this.FilterSearch=this.appendpoint + AppConstant.API_CONFIG.API_URL.KNOWLEDGE.FILTERSEARCH;
  }

  // Get all articles
  public getAllKbArticle() {
    return this.http.get(this.GetAllArticles);
  }

  // Get category
  public getCategory() {
    console.log();
    return this.http.get(this.CAT_URL);
  }

  // search for article
  public getArticleBySearch(value) {
      return this.http.get(this.Search_article + value);
  }



  // search by category
  public getCategoriesById(value) {
    return this.http.get(this.GETCATEGORIESBYID + value);
  }

  // add article
  public updateArticle(data: any): Promise<any> {
    return this.commonHttpService.globalPostService(this.INSERT_URL, data).then(
      data => {
          return data;
        }
      );
  }

  // get admin articles
  public getAdminArticles(page: number) {
    let con = '&Page' + page;
    return this.http.get(this.GETADMINARTICLES + con);
  }

  // edit article
  public getKbArticleById(ArticleId) {
    console.log((this.Edit_Fetch_URL + ArticleId));
    return this.http.get(this.Edit_Fetch_URL + ArticleId);
  }


  // for readmore
  public getArticleById(data: any): Promise<any> {
    console.log(data);
    return this.commonHttpService.globalGetService(this.ReadMore_URL, data).then(
      data => {
          return data;
      },  err => {
            console.log(err);
          }
    );
  }

  // pagination
  public getPageByNumber(ArticleId, CatId, value) {
    if (CatId === 0 && value !== null) {
      this.Concat = 'categ=' + '&Page=' + ArticleId + '&SearchString=' + value;
      console.log('Concat' + this.Concat);
      return this.http.get(this.PAGINATION + this.Concat);
    } else {
      this.Concat = 'categ=' + CatId + '&Page=' + ArticleId;
      console.log('Concat' + this.Concat);
      return this.http.get(this.PAGINATION + this.Concat);
    }
  }

  login(user_name: string, user_password: string) {
    if (user_name === 'admin' && user_password === '1234') {
      this.currentUser = {
        user_name: user_name,
        password: user_password,
        isAdmin: true
      };
      return;
    }
    this.currentUser = {
      user_email: user_name,
      password: user_password,
      isAdmin: false
    };
  }

  logout() {
    this.currentUser = null;
    this.redirectURL = '';
    this._router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getfiltersearch(catid,value){
    this.Concat='categ=' + catid + '&Page=1'+'&SearchString='+value;
    return this.http.get(this.FilterSearch+this.Concat);
  }

}


