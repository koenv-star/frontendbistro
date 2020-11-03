import { Injectable } from '@angular/core';
import { Bestelling } from '../models/bestelling';


@Injectable({
  providedIn: 'root'
})
export class BestellenService {
  private BestellingToken:string = "SESSION_BESTELLING"
  private NumberToken:string = "SESSION_NUMBERS"

  constructor() { }

  public getBestellingen():Bestelling[] {
    return JSON.parse(window.sessionStorage.getItem(this.BestellingToken));
  }

  public saveBestellingen(bestellingen:Bestelling[]) {
    window.sessionStorage.setItem(this.BestellingToken, JSON.stringify(bestellingen));
  }

  public getNumbers():number[] {
    return JSON.parse(window.sessionStorage.getItem(this.NumberToken));
  }

  public saveNumbers(numbers:number[]){
    return window.sessionStorage.setItem(this.NumberToken, JSON.stringify(numbers));
  }
  
}
