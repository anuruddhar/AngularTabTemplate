import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { DropDown } from '../../models/drop-down.model';
import { CommonFunction } from '../../utility/common-function';
import { Constant } from '../../utility/constant';

import { DropdownChangeEvent } from 'primeng/dropdown'; 

@Component({
    selector: 'app-drop-down',
    templateUrl: 'drop-down.component.html',
})
export class DropDownComponent implements OnInit {
    SelectedValue!: string;
    Disable = false;
    DropDownlist!: DropDown[];
    DataList: SelectItem[] = [];
    IsSorted = true;
    IsAll = true;
    // ControlName: string = '';

    @Input() placeHolderTest!: string;

    @Input()
    set sorted(value: boolean) {
        this.IsSorted = value;
    }
    get sorted() { return this.IsSorted; }

    @Input()
    set addall(value: boolean) {
        this.IsAll = value;
    }
    get addall() { return this.IsAll; }

    @Input()
    set list(items: DropDown[]) {
        if (items !== undefined && items !== null) {
            if (this.IsAll) {
                let allItem: DropDown;
                allItem = items.filter(a => a.Id === Constant.All.Value)[0];
                if (CommonFunction.IsNullOrUndefined(allItem)) {
                    items.push(new DropDown(Constant.All.Value, Constant.All.Text));
                }
            }

            if (this.IsSorted) {
                this.DropDownlist = items.sort((n1, n2) => {
                    if (n1.Id > n2.Id) {
                        return 1;
                    }
                    if (n1.Id < n2.Id) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                this.DropDownlist = items;
            }

            this.DataList = [];
            this.DropDownlist.forEach(item => {
                this.DataList.push({ label: item.Value, value: item.Id });
            });

        }
    }

    @Input()
    set select(value: any) {
        if (value === '' || CommonFunction.IsNullOrUndefined(value)) {
            value = '0';
        }
        this.SelectedValue = value.toString();
    }
    get select() { return this.SelectedValue; }

    @Input()
    set disabled(value: any) {
        if (CommonFunction.IsNullOrUndefined(value)) {
            value = false;
        }
        this.Disable = value;
    }
    get disabled() { return this.Disable; }


    // @Input()
    // set controlname(value: any) {
    //     if (CommonFunction.IsNullOrUndefined(value)) {
    //         value = '';
    //     }
    //     this.ControlName = value.toString();
    // }
    // get controlname() { return this.ControlName; }


    @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();


    constructor() { }
    ngOnInit() { }

    onSelect(target: DropdownChangeEvent) {
        this.selectedChange.emit(this.DropDownlist.filter(a => a.Id === this.SelectedValue)[0]);
    }
}
