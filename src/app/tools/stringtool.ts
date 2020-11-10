import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Stringtool {
  public static getTimeFromString(term: string): Time {
    if (!term.match('^[\\d]{2}:[\\d]{2}$')) return;

    let hoursAndMinutes: string[] = term.split(':');
    let hours = Number.parseInt(hoursAndMinutes[0]);
    let minutes = Number.parseInt(hoursAndMinutes[1]);
    return { hours: hours, minutes: minutes };
  }

  public static TimetoTimeString(time: Time) {
    let hours = time.hours;
    let minutes = time.minutes;
    const hour = hours < 10 ? '0' + hours : hours.toString();
    const minute = minutes < 10 ? '0' + minutes : minutes;
    

    return hour + ':' + minute;
  }
}
