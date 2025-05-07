import { GlobalVariable } from '../globals';
import { CommonFunction } from '../utility/common-function';


export class AuditInfo { // implements IAuditLog
    CreatedDateTime: Date;
    CreatedUserId: string;
    UpdatedDateTime: Date;
    UpdatedUserId: string;

    constructor() {
        this.CreatedDateTime = new Date();
        this.CreatedUserId = '';
        this.UpdatedDateTime= new Date();
        this.UpdatedUserId= '';
    }

    setAuditForCreation() {
        this.CreatedUserId = GlobalVariable.UserID;
        this.CreatedDateTime = CommonFunction.getDateTime();
    }

    setAuditForUpdation() {
        this.UpdatedUserId = GlobalVariable.UserID;
        this.UpdatedDateTime = CommonFunction.getDateTime();
    }

    updateAudit(): void {
        this.CreatedUserId = GlobalVariable.UserID;
        this.UpdatedUserId = GlobalVariable.UserID;
        this.CreatedDateTime = CommonFunction.getDateTime();
        this.UpdatedDateTime = CommonFunction.getDateTime();
    }

    set(obj: any): void {
        this.CreatedUserId = obj.CreatedUserId;
        this.UpdatedUserId = obj.UpdatedUserId;
        this.CreatedDateTime = obj.CreatedDateTime;
        this.UpdatedDateTime = obj.UpdatedDateTime;
    }
}
