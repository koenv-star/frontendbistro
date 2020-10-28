/**
 * Gemaakt door Jan
 */
export class Stringtool {

  public static capitalizeFirstLetterAfterDash(term: string): string {

    let chars: string[] = term.split('');

    for(let i = 0; i < chars.length; i++) {
      if(chars[i] === '-' && i !== chars.length -1)
        chars[i+1] = chars[i+1].toUpperCase();
    }

    return chars.join('');
  }
}
