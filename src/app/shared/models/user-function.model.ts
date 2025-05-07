export class UserFunction {
    ApplicationModuleFunctionID: number;
    FunctionName: string;
    FunctionCode: string;
    ParentApplicationModuleFunctionID: number;

    constructor() {
        this.ApplicationModuleFunctionID = 0;
        this.FunctionName = '';
        this.FunctionCode = '';
        this.ParentApplicationModuleFunctionID = 0;
    }
}
