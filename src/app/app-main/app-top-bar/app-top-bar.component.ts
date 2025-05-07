import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SelectItem, MessageService } from 'primeng/api';

import { GlobalVariable } from 'src/app/shared/globals';
import { MdiComponent } from '../mdi/mdi.component';
import '../../shared/utility/extension-method';
import { GlobalChangeNotifierService } from 'src/app/core/services/global-change-notifier.service';
import { LangData } from 'src/app/shared/lang-data';
import { LanguageConversionService } from 'src/app/core/services/language-conversion.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.css']
})
export class AppTopBarComponent implements OnInit {
  i18n: any;
  selectedLanguage: string;
  languages!: SelectItem[];
  invetoryLocations: SelectItem[];
  BarcodeNo: string;
  UserName!: string;

  constructor(
    public app: MdiComponent,
    private router: Router,
    private globalChangeNotifierService: GlobalChangeNotifierService,
    private languageConversionService: LanguageConversionService,
    private messageService: MessageService) {
      this.i18n = LangData[0];
    this.selectedLanguage = 'en-AU';
    this.fillLanguages();
    this.invetoryLocations = [];
    this.BarcodeNo = '';
    this.createInventoryLocationList();
  }

  ngOnInit() {
    this.UserName = GlobalVariable.UserID;
  }

  async onLanguageChanged(): Promise<void> {
    LangData.pop();
    const data = await this.languageConversionService.GetLocaleResource(this.selectedLanguage);
    LangData.push(data);
    this.languageConversionService.EmitLanguageChange(this.selectedLanguage);
  }

  onKeyPressedOnBarcodeTextBox(event: any): void {
    if (event.keyCode === 13) {
      this.messageService.add({ severity: 'error', summary: 'Item Display', detail: 'Invalid!' });
      this.BarcodeNo = '';
    }
  }

  createInventoryLocationList(): void {

  }

  fillLanguages(): void {
    this.languages = [
      { label: 'English (Au)', value: 'en-AU' },
      { label: 'Chinese', value: 'zh-CN' },
      { label: 'Chinese(Traditional)', value: 'zh-TW' }
    ];
  }

  loadItemDisplay(): void {
    alert(1);
  }

  UpdateUser(){
    
  }

  Logout(): void {

  }

}
