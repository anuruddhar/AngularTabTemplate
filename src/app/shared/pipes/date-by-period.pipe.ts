import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateByPeriod'
})
export class DateByPeriodPipe implements PipeTransform {
  CurrentDate = new Date();
  PassedDate = new Date();
  Difference!: number;

  Minutes!: number;
  Hours!: number;
  Days!: number;

  transform(date: any): string {
    this.PassedDate = new Date(date);
    this.Difference = Math.abs((this.CurrentDate.getTime() -  this.PassedDate.getTime()) / 60000);
    this.Minutes = Math.round(this.Difference);
    this.Hours = Math.round(this.Difference / 60);
    this.Days = Math.round(this.Hours / 24);
    if (this.Minutes < 60) {
      if (this.Minutes === 0) {
        return 'just now';
      } else {
        return this.Minutes + ' mins. ago';
      }
    } else if (this.Hours < 24) {
      if (this.Hours === 1) {
        return 'one hour ago';
      } else {
        return this.Hours + ' hours ago';
      }
    } else if (this.Hours >= 24) {
      if (this.Days === 1) {
        return 'one day ago';
      } else {
        return this.Days + ' days ago';
      }
    }
    return '';
  }

}
