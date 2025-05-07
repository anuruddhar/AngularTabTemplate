export class UserLogin {
    AccessLevel: string;
    ActiveStatus: string;
    AuthorizationLimit: number;
    DefaultCountryID: number;
    DefaultCultureID: string;
    DefaultLocationID: string;
    DefaultRegionID: string;
    DisplayPrice: boolean;
    EmailAddress: string;
    LoginID: number;
    Password: string;
    RepID: string;
    UserDomain: string;
    UserID: string;
    UserInitials: string;
    UserName: string;
    Workstation: string;

    constructor() {
        this.AccessLevel = '';
        this.ActiveStatus = '';
        this.AuthorizationLimit = 0;
        this.DefaultCountryID = 0;
        this.DefaultCultureID = '';
        this.DefaultLocationID = '';
        this.DefaultRegionID = '';
        this.DisplayPrice = false;
        this.EmailAddress = '';
        this.LoginID = 0;
        this.Password = '';
        this.RepID = '';
        this.UserDomain = '';
        this.UserID = '';
        this.UserInitials = '';
        this.UserName = '';
        this.Workstation = '';
    }
}
