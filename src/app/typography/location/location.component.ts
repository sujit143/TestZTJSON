import { MasterService } from './../../services/master.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AppservicesService } from './../../services/appservices.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, Message } from 'primeng/api';
import { Locations } from '../../Models/locations';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  updatedItem: number;
  title = 'Locations';
  selectedLocationOption: string;
  arrayLocation: Locations[] = [];
  id: number;
  name: string;
  description: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  website: string;
  phone1: string;
  phone2: string;
  fax: string;
  display: boolean;
  item: string;
  addForm: FormGroup;
  submitted = false;
  searcbyString: string;
  isProgress = false;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private _data: AppservicesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private masterService: MasterService
  ) {}

  ngOnInit() {
    this.getLoc();
    this.addForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      website: new FormControl(null),
      phone1: new FormControl(null, Validators.required),
      phone2: new FormControl(null),
      fax: new FormControl(null)
    });
  }

  getLoc() {
    this._data.getLocations().subscribe((data: Locations[]) => {
      this.arrayLocation = data;
      console.log(this.arrayLocation);
    });
  }

  onAdd() {
    this.addForm.reset();
    this.id = 0;
    this.display = true;
  }

  openEdit(item) {
    this.isProgress = true;
    this.display = true;
    this.id = item.id;
    this.addForm.patchValue({
      name: item.name,
      description: item.description,
      address1: item.address1,
      address2: item.address2,
      city: item.city,
      state: item.state,
      zip: item.zip,
      country: item.country,
      website: item.website,
      phone1: item.phone1,
      phone2: item.phone2,
      fax: item.fax,
    });
  }
  onFormSubmit(addForm) {
    const ErrorMsgNotification = this.masterService.getFormErrorMessage(addForm, this.addForm);
    if (ErrorMsgNotification !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: ErrorMsgNotification
      });
    }   else {
      this.submitted = true;
      if (this.id === 0) {
        this._data
          .addEditLocations(
            new Locations(
              addForm.value.id,
              addForm.value.name,
              addForm.value.description,
              addForm.value.address1,
              addForm.value.address2,
              addForm.value.city,
              addForm.value.state,
              addForm.value.zip,
              addForm.value.country,
              addForm.value.website,
              addForm.value.phone1,
              addForm.value.phone2,
              addForm.value.fax
            )
          )
          .subscribe(
            x => {
              this.ngOnInit();
              const successMessage = 'Location Added Successfuly';

              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: successMessage
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Update',
                detail: 'server not Responding'
              });
            }
          );

        this.display = false;
      } else {
        this.submitted = true;
        this._data
          .addEditLocations(
            new Locations(
              this.id,
              addForm.value.name,
              addForm.value.description,
              addForm.value.address1,
              addForm.value.address2,
              addForm.value.city,
              addForm.value.state,
              addForm.value.zip,
              addForm.value.country,
              addForm.value.website,
              addForm.value.phone1,
              addForm.value.phone2,
              addForm.value.fax
            )
          )
          .subscribe(
            () => {
              this.ngOnInit();
              this.messageService.add({
                severity: 'success',
                summary: 'Update',
                detail: 'Update Successfull'
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Update',
                detail: 'server not Responding'
              });
            }
          );
        this.display = false;
      }
    }
  }
  onSearch(value) {
    console.log(value);
    if (value !== ''  && value !== undefined ) {
      this.arrayLocation = this.arrayLocation.filter(x => x.name.toUpperCase().startsWith(value.toUpperCase()));
    } else {
      this._data.getLocations().subscribe(
        (data: Locations[]) => {
          this.arrayLocation = data;
        },
        function(error) {
          alert(error);
        },
        function() {}
      );
    }
  }

  confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onLocDelete(id);
      },
      reject: () => {}
    });
  }

  onLocDelete(id: number) {
    this._data.deleteLocations(id).subscribe((data: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Deleted Sucessfully'
      });
      this.ngOnInit();
    });
  }

  close() {
    console.log('close');
  }
}
