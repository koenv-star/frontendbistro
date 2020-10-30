export class Stringtool {

  public static getHoursFromString(term: string): number {
    if(!term.match('^[\\d]{2}:[\\d]{2}$')) return;

    let hoursAndMinutes: string[] = term.split(":");
    let hours = Number.parseInt(hoursAndMinutes[0]);
    return hours;
  }
}
