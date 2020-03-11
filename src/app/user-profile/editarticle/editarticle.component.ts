import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import jQuery from 'jquery';
import { Subscription } from 'rxjs';
import { KBArticles } from '../../Models/kbarticles';
import { KbarticlesService } from './../../services/appservices/kbarticles.service';
import { DdlCatogoryName } from '../../Models/ddlcategory';


@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.scss']
})

export class EditarticleComponent implements OnInit, OnDestroy {
  text: string;
  editForm: FormGroup;
  displayArticle: KBArticles;
  id: number;
  catname: string;
  catid: number;
  arr: DdlCatogoryName[] = [];
  public queryparams: any;
  private _subscriptions = new Subscription();

h

  constructor(
    private messageService: MessageService,
      private _data: KbarticlesService,
      private fb: FormBuilder,
      private _act: ActivatedRoute,
      private _router: Router,
      ) {
      this._subscriptions.add(
          this._router.routerState.root.queryParams.subscribe(
              (params: Params) => {
                  this.queryparams = params['ArticleId'];
              }
          )
      );
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      ArticleName: new FormControl(null),
      CategoryId: new FormControl(null),
      Content: new FormControl(null)
    });



    this.getArticleForEdit();

  }

  getArticleForEdit() {
    this.messageService.add({
      severity: 'success',
      detail: 'Processing...'
    });
    this.id = this.queryparams;
    console.log(this.id);
    this._data.getKbArticleById(this.id).subscribe(
      (x: KBArticles) => {
        this.displayArticle = x;
        this.catid = this.displayArticle.categoryId;
        console.log(this.displayArticle);
        this.editForm.patchValue({
          ArticleName: this.displayArticle.articleName,
          ArticleId: this.displayArticle.articleId,
          CategoryId: this.displayArticle.categoryId,
          CategoryName: this.displayArticle.categoryName,
          previewcontent: this.displayArticle.previewContent,
          Content: this.displayArticle.content
        });
        // tslint:disable-next-line: no-unused-expression


      },error=>{
          this.messageService.add({severity:'error',detail:'server not responding'});
        }


    );
    this._data.getCategory().subscribe(
      (data: DdlCatogoryName[]) => {
        this.arr = data;
      }
    );
    console.log(this.catid);
    this.editForm = this.fb.group({
      ArticleName: new FormControl(null),
      ArticleId: new FormControl(null),
      CategoryName: new FormControl(null),
      CategoryId: new FormControl(this.catid),
      Content: new FormControl(null),
      previewcontent: new FormControl(null)
  });
  }

  onEditArticle() {
    let req = {
      ArticleName: this.editForm.value.ArticleName,
      ArticleId: this.editForm.value.ArticleId,
      CategoryId: this.editForm.value.CategoryId,
      CategoryName: this.editForm.value.CategoryName,
      Content: this.editForm.value.Content,
      previewcontent: this.editForm.value.previewcontent,
      CreatedBy: this.editForm.value.CreatedBy,
      CreatedByName: this.editForm.value.CreatedByName,
      CreatedDate: this.editForm.value.CreatedDate,
      ModifiedBy: this.editForm.value.ModifiedBy,
      ModifiedByName: this.editForm.value.ModifiedByName,
      ModifiedDate: this.editForm.value.ModifiedDate
    };

///// needed

// const firstimg = jQuery(this.editForm.value.Content).find('img:first').attr('src');
// console.log(firstimg);
// const sushma = this.base64EncodeDecode.dataURLtoFile(firstimg, 'sushma');
// console.log('converting to binary' ,sushma);

    this._data.updateArticle(req).then(
      res => {
        if (res) {
          const successMessage = 'Updated  Successfuly';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: successMessage
          });

          setTimeout(() => {
            this._router.navigate(['/user-profile']);
          }, 1000);
        } else {
          console.log('failed');
        }
      },
      error => {
      }
    );


  }

  onClickClose() {
    this.messageService.add({
      severity: 'error',
      detail: 'Prcossing'
    });
    this._router.navigate(['/user-profile']);
  }

  ngOnDestroy() {
      this._subscriptions.unsubscribe();
  }

}
