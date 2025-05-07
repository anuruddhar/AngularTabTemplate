import { FormGroup } from '@angular/forms';

export class TabFormViewModel {
    FormGroup !: FormGroup;
    DisplayMessage: { [key: string]: string } = {};
    ValidationMessages: { [key: string]: { [key: string]: string } } = {};
    IsShowAdditionalCriteriaPopup: boolean  = false;
    IsRefreshWhenIlChange: boolean = false;

    // This is for Calender Display purpose
    // FromDate; Date;
    // ToDate: Date;
    
}
