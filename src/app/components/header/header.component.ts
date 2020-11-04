import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {CredentialServiceService} from '../../services/credential-service.service';
import {AccountService} from '../../services/account.service';
import {isNull} from "util";
import {Uitbater} from '../../models/uitbater';
import {Klant} from '../../models/klant';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  uitbater: Uitbater;
  klant: Klant;

  isUitbater = false;
  isKlant = false;
  navbarOpen = false;


  constructor(private tokenservice: TokenStorageService,
              private service: AuthenticationService,
              private userService: CredentialServiceService,
              private serviceAccount: AccountService,
              private router: Router) {

  }


  ngOnInit(): void {
    let user = this.tokenservice.getUser();
    if (!isNull(user)) {
      //setting the authentication BehaviorSubject to
      // the Account service can use the credentials to get
      // the information of the user from the server.
      this.service.userChange$.next({email: user.email,role: user.role});
      this.serviceAccount.updateUser();

      // if the user is role in Owner this method will update according to Owner information.
      this.serviceAccount.uitbater$.asObservable().subscribe(res => {
        this.uitbater = res;
        if (!isNull(this.uitbater)) {
          this.isUitbater = true;
        }
      });
      // if the user is role in Costumer this method will update according to Costumer information.
      this.serviceAccount.klant$.asObservable().subscribe(res => {
        this.klant = res;
        if (!isNull(this.klant)) {
          this.isKlant = true;
        }

      });

      this.checkStatus();

    }

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.tokenservice.signout(); // clearing the sessionStorage
    this.service.userChange$.next({email: null, role: null}); // clearing the authorization BehaviorSubject's values.
    this.serviceAccount.klant$.next(null); // clearing the Account service Costumer BehaviorSubject's values.
    this.serviceAccount.uitbater$.next(null);// clearing the Account service Owner  BehaviorSubject's values.
    this.isUitbater = false; // turning the header is not Owner.
    this.isKlant = false; // turning the header is not Costumer.
  }


  getCredentials(){
    // checking if the user already logged in setting the header according
    // to user information


  }
// checking if the user logged in or not
// if logged in then checking the role
// changing the header bar
  checkStatus() {

    if (!isNull(this.klant)) {
      this.isKlant = true;
      this.isUitbater = false;
    } else if (!isNull(this.uitbater)) {
      this.isUitbater = true;
      this.isKlant = false;
    } else if (isNull(this.uitbater) && isNull(this.klant)) {
      this.isUitbater = false;
      this.isKlant = false;
    }
  }

}
