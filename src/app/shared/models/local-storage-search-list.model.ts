import { SearchBase } from './search-base.model';

export class LocalStorageSearchList {
    Key: string;
    SearchCirteriaList: Array<SearchBase>;

    constructor() {
        this.Key = '';
        this.SearchCirteriaList = new Array<any>();
    }
}
