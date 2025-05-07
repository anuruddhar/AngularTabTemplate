import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropDown } from '../../models/drop-down.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  DropDownlist!: Array<DropDown>;
  DataList: Array<SelectItem> = [];
  SelectedValues: Array<string> = [];


  @Input()
  set list(items: DropDown[]) {
    if (items !== undefined && items !== null) {
      this.DropDownlist = items;
      this.DataList = [];
      this.DropDownlist.forEach(item => {
        this.DataList.push({ label: item.Value, value: item.Id });
      });

    }
  }

  @Input()
  set selecteditems(value: Array<string>) {
    this.SelectedValues = value;
  }
  get selecteditems() { return this.SelectedValues; }

  @Output() selectedChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();


  onChange(target: any) {
    this.selectedChange.emit(this.SelectedValues);
  }

  constructor() { }
  ngOnInit() { }


}
