export class AppException {
    ErrorCode: number = 0;
    Message: string = '';
    ErrorMessage: string = '';
    Data: any;
    HResult: any;
}

export interface AppException {
    IsException(): boolean;
}

