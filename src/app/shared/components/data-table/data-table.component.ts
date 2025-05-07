import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column.interface';
import { TableFooter } from '../../models/table-footer.interface';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { LangData } from '../../lang-data';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  i18n: any;
  ContextMenuItems: Array<MenuItem>;
  selectedItem: any;

  @ViewChild('dt') dataTable!: Table;

  @Input()
  Cols!: Array<TableColumn>;

  @Input()
  ShowFooter = false;

  @Input()
  Footers!: Array<TableFooter>;

  @Input()
  DataList!: Array<any>;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.i18n = LangData[0];
    this.ContextMenuItems = [
      { label: 'Save As CSV', icon: 'fa fa-download', command: (event) => this.exportToCSV() }
    ];
  }

  exportToCSV(): void {
    this.dataTable.exportCSV();
  }

  ngOnInit() {
  }

  onDoubleClicked(item: any): void {
    this.select.emit(item);
  }

}
