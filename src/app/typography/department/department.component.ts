import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { AppservicesService } from './../../services/appservices.service';
import { Department } from '../../Models/department';
import { MasterService } from '../../../app/services/master.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})

export class DepartmentComponent implements OnInit {
  selectedDepartmentOption: string;
  name: string;
  description: string;
  id: number;
  arrDept: Department[] = [];
  display  = false;
  resizable = false;
  submitted = false;
  deptForm: FormGroup;

  constructor(
    private http: HttpClient,
    private _data: AppservicesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private masterService: MasterService,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
      this.getDept();
      this.deptForm = this.fb.group ({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  getDept() {
    this._data.getDepartment().subscribe(
      (data: Department[]) => {
        this.arrDept = data;
        }
    );
  }
 showDialog(value) {
    this.display = true;
    this.selectedDepartmentOption = value;
    this.deptForm.reset();
}

openEdit(value, arrDept) {
    this.display = true;
    this.selectedDepartmentOption = value;
    this.deptForm.patchValue({
    id : arrDept.id,
    name : arrDept.name,
    description: arrDept.description
  });
}
     onDeptDelete(id: number) {
        this._data.deleteDepartment(id).subscribe((data: any) => {
        this.getDept();
        this.display = false;
        setTimeout(() => {
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Deleted Sucessfully'});
          }, 1000);
      },
      );
    }

  onFormSubmit(f) {
    const test = this.masterService.getFormErrorMessage(f, this.deptForm);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else {
      this.submitted = true;
      if (this.selectedDepartmentOption === 'add') {
          var req = {
          id: 0,
          description: f.value.description,
          name: f.value.name
        };
        this._data.addDepartment(req).subscribe((data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Added Sucessfully'
          });
          this.getDept();
          this.display = false;
        });
      } else {
        let req = {
          id: f.value.id,
          description: f.value.description,
          name: f.value.name
        };
        this._data.editDepartment(req).then(
          res => {
            if (res) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Updated Sucessfully'
              });
              this.getDept();
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
      this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.onDeptDelete(id);
          },
          reject: () => {
          }
      });
  }



}
