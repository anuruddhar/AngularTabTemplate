import { AppException } from '../models/common/app-exception';
// import { Guid } from 'guid-typescript';

export class CommonFunction {
    static datestr = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

    
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static IsValidObj(obj: any): boolean {
        return (obj !== undefined);
    }

    static getDateTime(): Date {
        // https://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc/1488552
        const date = new Date();
        const hoursDiff = date.getHours() - (date.getTimezoneOffset() / 60);
        const minutesDiff = date.getMinutes() - (date.getTimezoneOffset() % 60);
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    static getDateTimeWithTimeOffSet(date: Date): Date {
        // https://stackoverflow.com/questions/1486476/json-stringify-changes-time-of-date-because-of-utc/1488552
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
        date.setMinutes((date.getHours() - date.getTimezoneOffset()) % 60);
        return date;
    }

    static getDateFromString(dateStr: string): Date {
        const date = new Date(Date.parse(dateStr));
        return this.getDateFromDate(date);
    }

    static getDateFromDate(date: Date): Date {
        date.setHours(0 - date.getTimezoneOffset() / 60);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }

    static getDateString(d: Date | string): string {
        const date = new Date(Date.parse(d as string));
        let month = (date.getMonth() + 1) + '';
        if (month.length === 1) {
            month = `0${month}`;
        }
        let day = date.getDate() + '';
        if (day.length === 1) {
            day = `0${day}`;
        }
        return `${date.getFullYear()}-${month}-${day}`;
    }

    static getDateTimeString(d: Date | string): string {
        const date = new Date(Date.parse(d as string));
        let hour = date.getHours() + '';
        if (hour.length === 1) {
            hour = `0${hour}`;
        }
        let minute = date.getMinutes() + '';
        if (minute.length === 1) {
            minute = `0${minute}`;
        }
        let second = date.getSeconds() + '';
        if (second.length === 1) {
            second = `0${second}`;
        }
        return `${CommonFunction.getDateString(d)} ${hour}:${minute}:${second}`;
    }

    static getFromDateTimeString(d: Date | string): string {
        return `${CommonFunction.getDateString(d)} 00:00:00`;
    }

    static getToDateTimeString(d: Date | string): string {
        return `${CommonFunction.getDateString(d)} 23:59:59`;
    }

    static getNullDateString(): string {
        return '0001-01-01';
    }

    static getDateTimeFromString(dateStr: string): Date {
        const date = new Date(Date.parse(dateStr));
        return this.getDateTimeFromDate(date);
    }

    static getDateTimeFromDate(date: Date): Date {
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
        date.setMinutes((date.getMinutes() - date.getTimezoneOffset()) % 60);
        date.setSeconds((date.getSeconds() - date.getTimezoneOffset()) % 60);
        return date;
    }

    static getTodayDateTime(): Date {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    }

    static getTomorrowDateTime(): Date {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
    }

    static addMonthsToDate(value: string, months: number): Date {
        let d: Date;
        if (value.length === 7) {
            d = new Date(+value.substring(3, 8), (+value.substring(0, 2) - 1));
        } else {
            d = new Date(value);
        }
        d.setMonth(d.getMonth() + months);
        d.setHours(d.getUTCHours());
        d.setMinutes(d.getUTCMinutes());
        return d;
    }

    static cloneDate(date: Date): Date {
        const cloneDate = new Date(date.getTime());
        return cloneDate;
    }

    /*
    static clone(): any {
        // tslint:disable-next-line: new-parens
        const cloneObj = new (this.constructor() as any);
        for (const attribut in this) {
            if (typeof this[attribut] === 'object') {
                cloneObj[attribut] = this.clone();
            } else {
                cloneObj[attribut] = this[attribut];
            }
        }
        return cloneObj;
    }
    */

    static IsNotException(object: any): boolean {
        return !(object instanceof AppException);
    }

    static IsNullOrUndefined(data: any): boolean {
        return (data === undefined || data === null);
    }

    static IsEmptyArray(data: Array<any>): boolean {
        return (data === undefined || data === null || data.length === 0);
    }


    static IsNotNullOrUndefined(data: any): boolean {
        return (data !== undefined && data !== null);
    }

    static IsNullEmpty(data: any): boolean {
        return (data === undefined || data === null || data === -1 || data === '');
    }

    static IsNotNullEmpty(data: any): boolean {
        return (data !== undefined && data !== null && data !== -1 && data.trim() !== '');
    }

    static IsDateNotNull(data: Date | string): boolean {
        return (data !== undefined && data !== null && data !== '' );
    }

    static ExtractDateAndOthersFromJson(value: any): any {
        if (typeof value === 'string' && this.datestr.test(value.substring(0, 10))) {
            return new Date(value);
        }
        return value;
    }
    static IsValidDateOrNull(value: any): boolean {
        if (this.datestr.test(value.substring(0, 10))) {
            return true;
        };
        return false
    }

    static exportToCsv(filename: string, rows: Array<any>): void {
        if (!rows || !rows.length) {
            return;
        }
        const separator = ',';
        const keys = Object.keys(rows[0]);
        const csvContent =
            keys.join(separator) +
            '\n' +
            rows.map(row => {
                return keys.map(k => {
                    let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date
                        ? cell.toLocaleString()
                        : cell.toString().replace(/"/g, '""');
                    if (cell.search(/("|,|\n)/g) >= 0) {
                        cell = `"${cell}"`;
                    }
                    return cell;
                }).join(separator);
            }).join('\n');

        /*
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        */
    }

}
