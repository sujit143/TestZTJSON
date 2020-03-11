




import { AppservicesService } from './../../services/appservices.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { ActivatedRoute } from "@angular/router";

import { Organization } from './organization';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MasterService } from './../../services/master.service';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private _data: AppservicesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private masterService: MasterService
  ) { }
  updatedItem: number;
  title = 'Department';
  msgs: Message[] = [];
  closeResult: string;
  selectedDepartmentOption: string;
  name: string;
  msg = 'Are You Sure!';
  description: string;
  id: number;
  arrDept: Organization[] = [];
  editId: number;
  editName: string;
  editDescription: string;
  item: string;
  loading: boolean = true;
  display = false;
  draggable = false;
  resizable = false;

  deptForm: FormGroup;
  datanotfound: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.getOrg();

    this.deptForm = this.fb.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      registeredaddress1: new FormControl(null, Validators.required),
      registeredaddress2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      website: new FormControl(null, Validators.required),
      phone1: new FormControl(null, Validators.required),
      phone2: new FormControl(null, Validators.required),
      fax: new FormControl(null, Validators.required)
    });

  }
  // getOrg() {
  //   this._data.getOrganization().subscribe((data: Organization[]) => {
  //     this.arrDept = data;
  //     this.loading = false;
  //   },

  //   () => {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server not responding' });
  //   }
  //   );
  // }


  getOrg() {
    this._data.getOrganization().subscribe((data: Organization[]) => {
      this.arrDept = data["organizations"];
      this.loading = false;
      console.log(this.arrDept);
    },
      error => {
        this.datanotfound = true;
      },
      function () { }
    );
  }

  openAdd(value) {
    this.display = true;
    this.getOrg();
  }
  openEdit() {
    console.log(this.arrDept);
    this.display = true;
    this.deptForm.patchValue({
      id: this.arrDept[0].id,
      name: this.arrDept[0].name,
      description: this.arrDept[0].description,
      registeredaddress1: this.arrDept[0].registeredaddress1,
      registeredaddress2: this.arrDept[0].registeredaddress1,
      city: this.arrDept[0].city,
      state: this.arrDept[0].state,
      zip: this.arrDept[0].zip,
      country: this.arrDept[0].country,
      website: this.arrDept[0].website,
      phone1: this.arrDept[0].phone1,
      phone2: this.arrDept[0].phone2,
      fax: this.arrDept[0].fax
    });
  }

  onFormSubmit(f) {
    const test = this.masterService.getFormErrorMessage(this.deptForm, this.deptForm);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    }
    else {
      if (this.selectedDepartmentOption === 'add') {

        console.log(this.id);
        this._data.addOrganization(f.value).subscribe((data: any) => {
          this.display = false;
          console.log(f.value);
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Sucessfully' });

          }, 1000);

          this.getOrg();

        });
      }

      else {


        const req = {
          id: this.deptForm.value.id,
          name: this.deptForm.value.name,
          description: this.deptForm.value.description,
          registeredaddress1: this.deptForm.value.registeredaddress1,
          registeredaddress2: this.deptForm.value.registeredaddress2,
          city: this.deptForm.value.city,
          state: this.deptForm.value.state,
          zip: this.deptForm.value.zip,
          country: this.deptForm.value.country,
          website: this.deptForm.value.website,
          phone1: this.deptForm.value.phone1,
          phone2: this.deptForm.value.phone2,
          fax: this.deptForm.value.fax
        };

        console.log(req);
        this._data.editOrganization(req).then(
          res => {
            if (res) {
              this.display = false;
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Sucessfully' });
              }, 1000);
              this.getOrg();
            } else {
              console.log(res);
            }
          },
          error => {


          }
        );

      }
    }

  }

}