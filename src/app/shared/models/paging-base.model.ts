import { GlobalVariable } from '../globals';

export class PagingBase  {
    PageNo: number;
    ItemsPerPage: number;

    constructor(){
        this.PageNo = GlobalVariable.PageNo;
        this.ItemsPerPage = GlobalVariable.ItemsPerPage;
    }
}