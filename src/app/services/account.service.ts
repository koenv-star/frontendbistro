import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {Owner} from '../models/owner';
import {Costumer} from '../models/costumer';
import {TokenStorageService} from './token-storage.service';
import {AuthenticationService} from './authentication.service';
import {CredentialServiceService} from './credential-service.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  owner$ : BehaviorSubject<Owner> =  new BehaviorSubject<Owner>(null);
  costumer$ : BehaviorSubject<Costumer> = new BehaviorSubject<Costumer>(null);
  constructor(private serviceToken: TokenStorageService,
              private serviceAuth: AuthenticationService,
              private userService: CredentialServiceService,
              private router: Router) {


  }

  updateUser(){
    this.serviceAuth.userChange$.asObservable().subscribe(res => {
      if (res.role != null ){
        if (res.role == 'ROLE_KLANT'){
          // take the customer information from backend according to email and assign to this.customer
          this.userService.getCostumerCredentials(res.email).subscribe(data => {
            this.costumer$.next(data);
          });
        }else {
          // take the owner information from backend according to email and assign to this.owner
          this.userService.getOwnerCredentials(res.email).subscribe(data => {
            this.owner$.next(data);
          });
        }
      }else {
        return null;
      }
    });
  }
}

