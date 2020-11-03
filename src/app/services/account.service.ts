import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {AuthenticationService} from './authentication.service';
import {CredentialServiceService} from './credential-service.service';
import {Router} from '@angular/router';
import {Uitbater} from '../models/uitbater';
import {Klant} from '../models/klant';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  uitbater$ : BehaviorSubject<Uitbater> =  new BehaviorSubject<Uitbater>(null);
  klant$ : BehaviorSubject<Klant> = new BehaviorSubject<Klant>(null);
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
            this.klant$.next(data);
          });
        }else {
          // take the owner information from backend according to email and assign to this.owner
          this.userService.getOwnerCredentials(res.email).subscribe(data => {
            this.uitbater$.next(data);
          });
        }
      }else {
        return null;
      }
    });
  }
}
