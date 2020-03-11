import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

import Chart from 'chart.js';

import { ROUTES } from '../sidebar/sidebar.component';
import { LocalStorageService } from '../../shared/local-storage.service';
import { AppConstant } from '../../app.constant';
import { KbarticlesService } from '../../../app/services/appservices/kbarticles.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  dashboardMenu = false;
  settingMenu = false;
  typography = false;
  EdirtMenu = false;
  public isCollapsed = true;
  flag = false;
  title = 'dashboard';

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private _data: KbarticlesService,
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
      this.getTitle();
    });
    this.getTitle();
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(function() {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function() {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobile_menu_visible === 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function() {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(function() {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() {
        // asign a function
        html.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var title = window.location.href.split('?')[0];
    var titlee = this.location.prepareExternalUrl(title);

    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    // if(titlee === 'dashboard')
    // {
    //   this.dashboardMenu = true;
    // }
    // else{
    //   this.dashboardMenu = false;
    // }
    // if(titlee === 'user-profile')
    // {
    //   this.settingMenu=true;
    // }
    // else{
    //   this.settingMenu=false;
    // }
    if (titlee === 'dashboard' && 'leave' && 'holidaylist') {
      this.dashboardMenu = true;
      this.settingMenu = false;
      this.typography = false;
    } else if (
      titlee === 'user-profile' ||
      titlee === 'edit' ||
      titlee === 'readmore' ||
      titlee === 'add'
    ) {
      this.settingMenu = true;
      this.dashboardMenu = false;
      this.typography = false;
    } else if (
      titlee === 'typography' ||
      titlee === 'designation' ||
      titlee === 'department' ||
      titlee === 'location' ||
      titlee === 'organization' ||
      titlee === 'user' ||
      titlee === 'document' ||
      titlee === 'timesheet'
    ) {
      this.typography = true;
      this.settingMenu = false;
      this.dashboardMenu = false;
    }
    else {
      this.dashboardMenu = true;
      this.typography = false;
      this.settingMenu = false;
      this.EdirtMenu = false;
    }
    this.title = titlee;
  }

  Change() {
    var isFlag = this.localStorageService.getItem(
      AppConstant.API_CONFIG.LOCALSTORAGE.ISFLAG
    );

    if (this.flag === false) {
      this.flag = true;
      this.localStorageService.addItem(
        AppConstant.API_CONFIG.LOCALSTORAGE.ISFLAG,
        this.flag
      );
    } else {
      this.flag = false;
      this.localStorageService.addItem(
        AppConstant.API_CONFIG.LOCALSTORAGE.ISFLAG,
        this.flag
      );
    }

    this._data.userActivated.next(this.flag);
    console.log(this.flag);
  }
}

