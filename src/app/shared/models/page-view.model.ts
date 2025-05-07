import { GlobalVariable } from '../globals';
import { AppException } from './common/app-exception';

export class PagingViewModel<T> {
    PageNo: number;
    ItemsPerPage: number;
    TotalRows: number;
    TotalPages: number;
    RowData: Array<T>;

    constructor() {
        this.PageNo = GlobalVariable.PageNo;
        this.ItemsPerPage = GlobalVariable.ItemsPerPage;
        this.TotalRows = 0;
        this.TotalPages = 0;
        this.RowData = new Array<T>();
    }
}
