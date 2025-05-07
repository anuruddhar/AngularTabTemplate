import { Component, OnInit } from '@angular/core';

import { GlobalVariable, Global } from 'src/app/shared/globals';
import { CommonFunction } from 'src/app/shared/utility/common-function';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {

  dateTime!: Date;
  global!: Global;
  ReleaseType = '';

  constructor() { }

  ngOnInit() {
    this.global = GlobalVariable;
    this.dateTime = CommonFunction.getDateTime();
    this.ReleaseType = GlobalVariable.ReleseType;

    let theme = localStorage.getItem(`LAYOUT_LINK_${GlobalVariable.UserID}_${GlobalVariable.ReleseType}`);
    let layOut = localStorage.getItem(`THEME_LINK_${GlobalVariable.UserID}_${GlobalVariable.ReleseType}`);

    if (theme == null || theme == undefined || theme == '') {
      theme = `assets/theme/theme-indigo-purple.css`;
    }
    if (layOut == null || layOut == undefined || layOut == '') {
      layOut = `assets/layout/css/layout-indigo-purple.css`;
    }

    const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
    layoutLink.href = layOut;

    const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
    themeLink.href = theme;
  }


}
