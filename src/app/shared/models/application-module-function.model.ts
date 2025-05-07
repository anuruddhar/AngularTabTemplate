export class ApplicationModuleFunction {
    ApplicationModuleFunctionID: number;
    ApplicationModuleID: number;
    Description: string;
    FunctionCode: string;
    FunctionType: string;
    LinkControlModuleFunctionID: number;
    ParentApplicationModuleFunctionID: number;
    SortOrder: number;

    constructor() {
        this.ApplicationModuleFunctionID = 0;
        this.ApplicationModuleID = 0;
        this.Description = '';
        this.FunctionCode = '';
        this.FunctionType = '';
        this.LinkControlModuleFunctionID = 0;
        this.ParentApplicationModuleFunctionID = 0;
        this.SortOrder = 0;
    }
}
