import { GlobalVariable } from '../globals';
import { CommonFunction } from '../utility/common-function';

export class ClientError {
    ErrorMessage: string;
    ErrorStack: string;
    UserID: string;
    DateTime: Date;

    constructor() {
        this.ErrorMessage = '';
        this.ErrorStack = '';
        this.UserID = GlobalVariable.UserID;
        this.DateTime =  CommonFunction.getDateTime();

    }
}
