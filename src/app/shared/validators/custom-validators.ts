
import { AbstractControl } from '@angular/forms';
import { CommonFunction } from '../utility/common-function';

export class CustomValidators {

  static validatePastDate(control: AbstractControl): { [key: string]: boolean } | null {
    let value = control.value;
    if (value.length === 7) {
     // console.log(new Date(value.substring(3, 8), (value.substring(0, 2) - 1)));
      value = new Date(value.substring(3, 8), (value.substring(0, 2) - 1));
    }
    // console.log(new Date());
    if (new Date(value) >= new Date()) {
      return { validatePastDate: true };
    }
    return null;
  }

  static validateFutureDate(control: AbstractControl): { [key: string]: boolean } | null {
    let value = control.value;
    if (value.length === 7) {
      value = '01/' + value;
    }
    if (new Date(value) <= new Date()) {
      return { validateFutureDate: true };
    }
    return null;
  }

  static validateBarcodeFormat(control: AbstractControl): { [key: string]: boolean } | null {
    if (!CommonFunction.IsValidBarcode(control.value)) {
      return { validateBarcodeFormat: true };
    }
    return null;
  }

  static validateNonZero(control: AbstractControl): { [key: string]: boolean } | null {
    if (!CommonFunction.IsValidBarcode(control.value)) {
      return { validateBarcodeFormat: true };
    }
    return null;
  }

  static validateSerialNo(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const checkValue = control.value;

      const passControl = control.root.get('SerialNoFrom');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== checkValue) {
          return {
            isError: true,
          };
        }
      }
    }
    return null;
  }
}
