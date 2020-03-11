import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  name: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'HRMS',
    icon: 'users_circle-08',
    class: '',
    name: 'dashboard'
  },
  {
    path: '/icons',
    title: 'Projects',
    icon: 'location_bookmark',
    class: '',
    name: 'icons'
  },
  {
    path: '/maps',
    title: 'Task Boards',
    icon: 'design_bullet-list-67',
    class: '',
    name: 'maps'
  },
  {
    path: '/notifications',
    title: 'Chats',
    icon: 'ui-2_chat-round',
    class: '',
    name: 'notifications'
  },

  {
    path: '/user-profile',
    title: 'Knowledge Base',
    icon: 'files_single-copy-04',
    class: '',
    name: 'userprofile'
  },
  {
    path: '/table-list',
    title: 'Reports',
    icon: 'ui-1_calendar-60',
    class: '',
    name: 'tablelist'
  },
  {
    path: '/typography',
    title: 'Settings',
    icon: 'ui-1_settings-gear-63',
    class: '',
    name: 'typography'
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  menuItems: any[];
  isBase = false;
  selectedIndex: number;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  /*##################### Registration Form #####################*/
  registrationForm = this.fb.group({
    file: [null]
  });

  /*########################## File Upload #######################*/
  @ViewChild('fileInput', { static: true }) el: ElementRef;
  imageUrl: any =
    'http://qa.zoomteams.com/images/69ef7537-b9f1-4099-beda-91652477b762.jpeg';
  editFile: boolean = true;
  removeUpload: boolean = false;
  submitted: boolean = true;
  indexVal: number;
  index: RouteInfo;
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    // this.select(0);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  ngAfterViewInit() {
    console.log(this.router.url);
    var path = this.router.url.split('?')[0];
    var index = _.findIndex(this.menuItems, m => {
      return m.path === path;
    });
    console.log(index);

    setTimeout(() => {
      this.select(index);
    }, 500);
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl =
      'http://qa.zoomteams.com/images/69ef7537-b9f1-4099-beda-91652477b762.jpeg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }

  // Submit Registration Form
  onSubmit() {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!');
      return false;
    } else {
      console.log(this.registrationForm.value);
    }
  }

  select(index: number) {
    this.selectedIndex = index;
  }
  navigateToUserprofile(index) {
    var req = {
      pagenumber: 1
    };
    this.select(index);
    this.router.navigate(['/user-profile'], { queryParams: req });
  }
}
