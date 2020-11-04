import { Time } from '@angular/common';

export class Stringtool {

  public static getTimeFromString(term: string): Time {
    if(!term.match('^[\\d]{2}:[\\d]{2}$')) return;

    let hoursAndMinutes: string[] = term.split(":");
    let hours = Number.parseInt(hoursAndMinutes[0]);
    let minutes = Number.parseInt(hoursAndMinutes[1]);
    return { hours: hours, minutes: minutes };
  }
}
