import { GlobalVariable } from '../globals';
import { CommonFunction } from '../utility/common-function';
import { IQueryStringConverter } from './iquery-string-converter';
import { PagingBase } from './paging-base.model';


export class SearchBase extends PagingBase implements IQueryStringConverter {
    UserId: string;
    IsRefresh: boolean;

    SearchCriteriaString: string;
    override PageNo: number;
    override ItemsPerPage: number;
    TotalItems: number;
    SearchBy: string;
    SearchString: string;

    SearchDateTimeCalender: Date;
    FromDateCalender: Date;
    ToDateCalender: Date;

    SearchDateTime: Date | string;;
    FromDate: Date | string;
    ToDate: Date | string;

    constructor() {
        super();
        this.UserId = GlobalVariable.UserID;
        this.SearchCriteriaString = '';
        this.PageNo = 0;
        this.ItemsPerPage = 0;
        this.SearchBy = '';
        this.IsRefresh = true; // false;
        this.TotalItems = 0;
        this.SearchString = '';
        this.FromDate = this.FromDateCalender = CommonFunction.getTodayDateTime();
        this.ToDate = this.ToDateCalender = CommonFunction.getTomorrowDateTime();
        this.SearchDateTime = this.SearchDateTimeCalender =  CommonFunction.getDateTime();
    }

    convetToSearchString(): void {
        this.SearchCriteriaString = this.getSearchByDescription() + this.getSearchCriteria();
    }

    getSearchByDescription(): string {
        return '';
    }

    getSearchCriteria(): string {
        if (this.SearchString.IsNullOrEmpty()) {
            return '';
        } else {
            return `value: ${this.SearchString} | `;
        }
    }

    SetDateToStringForNecessaryFields(): void {
        if (CommonFunction.IsDateNotNull(this.FromDateCalender)) {
            this.FromDate = CommonFunction.getFromDateTimeString(this.FromDateCalender);
        }
        if (CommonFunction.IsDateNotNull(this.ToDateCalender)) {
            this.ToDate = CommonFunction.getToDateTimeString(this.ToDateCalender);
        }
        if (CommonFunction.IsDateNotNull(this.SearchDateTimeCalender)) {
            this.SearchDateTime = CommonFunction.getDateTimeString(this.SearchDateTimeCalender);
        }
    }

    public ToQueryString(): string {
        return `UserId=${this.UserId}&
                PageNo=${this.PageNo}&
                ItemsPerPage=${this.ItemsPerPage}&
                TotalItems=${this.TotalItems}&
                SearchString=${this.SearchString}"`;
    }
}
