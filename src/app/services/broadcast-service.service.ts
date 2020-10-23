import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastServiceService {
  public errorNumber: BehaviorSubject<number>;
  public errorMessage: BehaviorSubject<string>;

  constructor() {
    this.errorMessage = new BehaviorSubject<string>('');
    this.errorNumber = new BehaviorSubject<number>(0);
  }
}
