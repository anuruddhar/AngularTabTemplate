import { AppException } from '../models/common/app-exception';

declare global {
    interface String {
        IsNullOrEmpty: () => boolean;
    }

    interface Date {
        ToValidDateTime: () => string;
    }

    interface Array<T> {
        IsNotNullOrEmpty(): boolean;
        IsNullOrEmpty(): boolean;
    }
}

// Note: Keep this as fucntion. Don't change to Arrow fucntion syntax,  because from the this will give error.
String.prototype.IsNullOrEmpty = function(): boolean {
    if (this === undefined || this === null || this.trim() === '') {
        return true;
    }
    return false;
};

Date.prototype.ToValidDateTime =  function(): string  {
    let d = this;
    if (d == null) {
        d = new Date();
    }
    const dArray = this.toLocaleDateString('en-GB').split('/');
    return `${dArray[2]}-${dArray[1]}-${dArray[0]} ${d.toLocaleTimeString()}`;
};

Array.prototype.IsNotNullOrEmpty =  function(): boolean  {
    if (this === undefined || this === null) {
        return false;
    }
    return !(this.length === 0);
};

Array.prototype.IsNullOrEmpty =  function(): boolean  {
    if (this === undefined || this === null) {
        return true;
    }
    return (this.length === 0);
};

AppException.prototype.IsException =  function(): boolean {
    return this instanceof AppException;
};


export { };

