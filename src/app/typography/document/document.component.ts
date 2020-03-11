import { Document } from './../../Models/document';
import { AppservicesService } from './../../services/appservices.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, Message } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MasterService } from '../../../app/services/master.service';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  config: any;
  collection = [];
  submitted = false;

  constructor(private http: HttpClient,
    private modalService: NgbModal,
    private _data: AppservicesService,
    private confirmationService: ConfirmationService, 
    private act: ActivatedRoute, 
    private messageService: MessageService,
    private masterService: MasterService,
    private fb: FormBuilder) {
    this.documentsdata = this.act.snapshot.data['Docdata'];

    this.config = {
        itemsPerPage: 5,
        currentPage: 2,
        totalItems: this.collection.length
      };
}
updatedItem: number;
title = 'Documents';
closeResult: string;
selectedDocumentOption: string;
msg = 'Are You Sure!';

selectedDocument: any = {
  id: 0,
  name: '',
  description: ''
};

arrDoc: Document[] = [];
msgs: Message[] = [];
editId: number;
editName: string;
editDescription: string;

id: number;
organizationId: number;
name: string;
description: string;
isactive: boolean;
isgeneral: boolean;
createdby: number;
createddate: Date;
modifiedby: number;
modifieddate: Date;
loading: boolean = true;
documentsdata: any;
errormsg: string;

display:boolean=false;

docForm :FormGroup;

ngOnInit() {
    this.loading = true;
    this.getDocuments();

    this.docForm = this.fb.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)


    });
}

getDocuments() {
    this._data.getAllDocuments().subscribe((data: Document[]) => {
        this.arrDoc = data;
        this.loading = false;
        console.log(this.arrDoc);
    });
}

OpenAddEdit(value, id?, designation?) {
  this.id = undefined;

  this.selectedDocumentOption = value;
  if (value === 'Add') {
    this.docForm.setValue(this.selectedDocument);
  } else {
    this.docForm.patchValue({
      id: designation.id,
      name: designation.name,
      description: designation.description
    });
  }
  this.display = true;
}

pageChanged(event) {
    this.config.currentPage = event;
  }

onDocDelete(id: number) {
    this._data.deleteDocument(id).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Deleted Sucessfully'
          });
            this.ngOnInit();
        }
    );

}

onFormSubmit(f) {
  const test = this.masterService.getFormErrorMessage(f, this.docForm);

  console.log(test);
  if (test !== undefined) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error Message',
      detail: test
    });
  } else 
  {
    this.submitted = true;
  console.log(this.selectedDocumentOption);
  if (this.selectedDocumentOption == 'Add') {
    console.log(this.id);
    let req = {

      name:f.value.name,
      description:f.value.description
    }
    console.log(req);
    
    this._data.addDocuments(req).subscribe((data: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Added Sucessfully'
      });
        this.getDocuments();
        this.display=false;
    });
}
    else {
      let req = {
        id: f.value.id,
        name: f.value.name,
        description: f.value.description,
      };
        
        console.log(req);
        this._data.editDocument(req)

            .then(res => {
              if (res) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success Message',
                  detail: 'Updated Sucessfully'
                });
                this.getDocuments();
                this.display = false;
              } else {
                console.log(res);
              }
            }, 
            error => {
            });

    }
}
}


confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
        message: "Are you sure that you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {

            this.onDocDelete(id);
            
        },
        reject: () => {
           
        }
    });
}

}


