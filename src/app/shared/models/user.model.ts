import { UserLogin } from './user-login.model';
import { ApplicationModuleFunction } from './application-module-function.model';

export class User {
    UserLogin: UserLogin;
    IsLoginSucess: boolean;
    Message: string;
    FunctionList: ApplicationModuleFunction[];

    constructor() {
        this.UserLogin = new UserLogin();
        this.IsLoginSucess = true;
        this.Message = '';
        this.FunctionList = [];
    }
}
