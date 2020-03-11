import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { KbarticlesService } from '../../services/appservices/kbarticles.service';
import { DdlCatogoryName } from '../../Models/ddlcategory';
import { KBArticles } from '../../Models/kbarticles';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.scss']
})

export class AddarticleComponent implements OnInit {
  text: string;
  addForm: FormGroup;
  category_disp: DdlCatogoryName[] = [];

  constructor(private fb: FormBuilder, private data: KbarticlesService, private route: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.data.getCategory().subscribe(
      (data: DdlCatogoryName[]) => {
        this.category_disp = data;
        console.log(this.category_disp);
      }
    );

    this.addForm = this.fb.group({
      article_name: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      category_id: new FormControl(null, Validators.required)
    });

  }
  onAddArticle() {

    if (this.addForm.value.content === null) {
      const validationMessage = 'Editor is empty';
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: validationMessage
      });
    } else {
        this.data.updateArticle(
          new KBArticles(
            this.addForm.value.article_id,
            this.addForm.value.article_name,
            this.addForm.value.content,
            this.addForm.value.previewcontent,
            this.addForm.value.category_id,
            this.addForm.value.category_name,
            this.addForm.value.created_by,
            this.addForm.value.created_by_name,
            this.addForm.value.created_date,
            this.addForm.value.modified_by,
            this.addForm.value.modified_by_name,
            this.addForm.value.modified_date
          )
        ).then(
          (x) => {
            const successMessage = 'Article Added Successfuly';
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: successMessage
            });
            setTimeout(() => {
              this.route.navigate(['/user-profile']);
            }, 1000);
        },
        error=>{
          this.messageService.add({severity:'error',detail:'server not responding'});
        }


      );
    }
  }

  onClickClose() {
    this.messageService.add({
      severity: 'warning',
      detail: 'processing...'
    });
    this.route.navigate(['/user-profile']);
  }
}
