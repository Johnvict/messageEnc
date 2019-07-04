import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let formatDate = '';
    let today = moment();

    if(moment(value).isSame(today, 'day')) formatDate = moment(value).format("HH:mm")
    else formatDate = moment(value).format("DD MMM");

    return formatDate;

  }
}
