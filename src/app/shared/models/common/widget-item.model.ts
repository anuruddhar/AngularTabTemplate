import { GlobalVariable } from '../../globals';

export class WidgetItem {
    Icon: string;
    BackgroundColor: string;
    MainData: number;
    DetailData: string;
    Title: string;
    IsLoading: boolean;

    constructor() {
        this.Icon = 'fa fa-snowflake-o';
        this.BackgroundColor = GlobalVariable.InfoColor;
        this.MainData = 0;
        this.DetailData =  '';
        this.Title =  '';
        this.IsLoading = true;
    }

    loadData(): void {}
}
