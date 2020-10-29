import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Costumer} from '../../models/costumer';
import {Owner} from '../../models/owner';
import {CredentialServiceService} from '../../services/credential-service.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AccountService} from '../../services/account.service';
import {isNull} from 'util';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  owner$: Owner;
  costumer$: Costumer;

  constructor(private serviceCredentials: CredentialServiceService,
              private router: Router,
              private serviceToken: TokenStorageService,
              private serviceAuth: AuthenticationService,
              private serviceAccount: AccountService) {
  }

  ngOnInit(): void {
    // checking if the user already logged in changing the header according
    // to user information.
    let user = this.serviceToken.getUser();
    if (!isNull(user)) {
      this.serviceAuth.userChange$.next({email: user.email, role: user.role});
      this.serviceAccount.updateUser();
      this.serviceAccount.costumer$.asObservable().subscribe(data => {
        this.costumer$ = data;
      });
      this.serviceAccount.owner$.asObservable().subscribe(data => {
        this.owner$ = data;
      });
    }
  }
}
