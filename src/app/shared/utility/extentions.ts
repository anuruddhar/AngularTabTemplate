export class Extentions {
    static ToValidDateTime(date: Date | string): string {
        if (date == null) {
            date = new Date();
        }
        if (date === '') {
            return date;
        }

        if (date instanceof Date) {
            const dArray = (date as Date).toLocaleDateString('en-GB').split('/');
            return `${dArray[2]}-${dArray[1]}-${dArray[0]} ${(date as Date).toLocaleTimeString('en-GB')}`;
        } else {
            return date;
        }

    }

    static ToValidDate(date: Date | string): string {
        if (date == null) {
            date = new Date();
        }
        if (date === '') {
            return date;
        }

        if (date instanceof Date) {
            const dArray = (date as Date).toLocaleDateString('en-GB').split('/');
            return `${dArray[2]}-${dArray[1]}-${dArray[0]} 00:00:00`;
        } else {
            return date;
        }
    }
}

export class ObjectExtentions { }
