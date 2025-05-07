
import { Constant } from './utility/constant';


export class Global {
  Country!: string;
  MockApibase!: string;
  Apibase!: string;
  IsCheckSumEnabled!: boolean;
  InputDateFormat!: string;
  InputDateTimeFormat!: string;
  DateTimeFormatMarker!: string;
  InputCalenderDateFormat!: string;
  InputCalenderMonthYearFormat!: string;
  PageNo!: number;
  ItemsPerPage!: number;
  ShowTheme!: boolean;
  UserID!: string;
  UseMock!: boolean;
  Version!: string;
  CredentialRequired!: boolean;
  PrimaryColor!: string;
  SecondaryColor!: string;
  SucessColor!: string;
  DangerColor!: string;
  WarningColor!: string;
  InfoColor!: string;
  ReleseType!: string;
  useTabView!: boolean;
}


export let GlobalVariable: Global = {
  Country: 'SIN',
  MockApibase: 'http://localhost:4200/',
  Apibase: '',
  IsCheckSumEnabled: true,
  InputDateFormat: 'yyyy-MM-dd',
  InputDateTimeFormat: 'yyyy-MM-dd HH:mm',
  DateTimeFormatMarker: 'yyyy-MM-dd h:mm a',
  InputCalenderDateFormat: 'dd/mm/yy',
  InputCalenderMonthYearFormat: 'mm/yy',
  PageNo: 1,
  ItemsPerPage: 50,
  ShowTheme: false,
  UserID: '',
  Version: '1.0.0',
  CredentialRequired: true,
  PrimaryColor: '#17a2b8',
  SecondaryColor: '#6c757d',
  SucessColor: '#28a745',
  DangerColor: '#dc3545',
  WarningColor: '#ffc107',
  InfoColor: '#17a2b8',
  UseMock: true,
  ReleseType: '',
  useTabView: true
};


