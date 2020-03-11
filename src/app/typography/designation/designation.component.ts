import { AppservicesService } from './../../services/appservices.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { Designation } from '../../Models/designaton';
import { MasterService } from '../../../app/services/master.service';
import * as _ from 'lodash';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})

export class DesignationComponent implements OnInit {

  selectedDesignationOption: string;
  name: string;
  description: string;
  id: number;
  arrDesig: Designation[] = [];
  display = false;
  desgForm: FormGroup;
  selectedDesign: any = {
    id: 0,
    name: '',
    description: ''
  };

  constructor(
    private http: HttpClient,
    private _data: AppservicesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private masterService: MasterService
  ) {}

  ngOnInit() {
    this.getDesig();
    this.desgForm = this.fb.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  getDesig() {
    this._data.getDesignations().subscribe(
      (data: Designation[]) => {
        this.arrDesig = data;
        console.log(this.arrDesig);
      }
    );
  }


  showDialog(value, id?, designation?) {
    this.id = undefined;
    this.selectedDesignationOption = value;
    if (value === 'Add') {
      this.desgForm.setValue(this.selectedDesign);
    } else {
      this.desgForm.patchValue({
        id: designation.id,
        name: designation.name,
        description: designation.description
      });
    }
    this.display = true;
  }

  openEdit(arrDesig) {
    this.display = true;
    this.desgForm.patchValue({
      id: arrDesig.id,
      name: arrDesig.name,
      description: arrDesig.description
    });
  }

  onDesigDelete(id: number) {
    console.log(id);
    this._data.deleteDesignation(id).subscribe(
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
    const test = this.masterService.getFormErrorMessage(f, this.desgForm);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else {
      if (this.selectedDesignationOption === 'Add') {
        console.log(f.value);
        var req = {
          description: f.value.description,
          name: f.value.name
        };
        this._data.addDesignation(req).subscribe(
          (data: any) => {
            console.log(f.value);
            this.messageService.add({
              severity: 'success',
              summary: 'Success Message',
              detail: 'Added Sucessfully'
            });
            this.getDesig();
            this.display = false;
          }
        );
      } else {
        console.log(f.value);
        console.log(f.value.name);
        let req = {
          id: f.value.id,
          description: f.value.description,
          name: f.value.name
        };
        console.log(req);
        this._data.editDesignation(req).then (
          res => {
            if (res) {
              this.messageService.add ({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Updated Sucessfully'
              });
              this.getDesig();
              this.display = false;
            } else {
            }
          },
          error => {}
        );
      }
    }
  }

  confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDesigDelete(id);
      },
      reject: () => {}
    });
  }
}
