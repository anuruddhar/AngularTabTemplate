export class SvxResult {
    Success: boolean;
    ResultID: string;
    Result: any;
    UserMessage: string;

    constructor() {
        this.Success = false;
        this.ResultID = '';
        this.Result = '';
        this.UserMessage = '';
    }
}
