import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {CredentialServiceService} from '../../services/credential-service.service';
import {Owner} from '../../models/owner';
import {Costumer} from '../../models/costumer';
import {AccountService} from '../../services/account.service';
import {isNull} from "util";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  owner: Owner;
  costumer: Costumer;

  isOwner = false;
  isCostumer = false;
  navbarOpen = false;


  constructor(private tokenservice: TokenStorageService,
              private service: AuthenticationService,
              private userService: CredentialServiceService,
              private serviceAccount: AccountService,
              private router: Router) {

  }


  ngOnInit(): void {
    this.getCredentials();

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.tokenservice.signout();
    this.service.userChange$.next({email: null, role: null});
    this.serviceAccount.costumer$.next(null);
    this.serviceAccount.owner$.next(null);
    this.isOwner = false;
    this.isCostumer = false;
  }


  getCredentials(){
    // checking if the user already logged in setting the header according
    // to user information
    let user = this.tokenservice.getUser();
    if (!isNull(user)) {
      //setting the authentication BehaviorSubject to
      // the Account service can use the credentials to get
      // the information of the user from the server.
      this.service.userChange$.next({email: user.email,role: user.role});
      this.serviceAccount.updateUser();

      // if the user is role in Owner this method will update according to Owner information.
      this.serviceAccount.owner$.asObservable().subscribe(res => {
        this.owner = res;
        if (!isNull(this.owner)) {
          console.log('notnull');
          this.isOwner = true;
        }
      });
      // if the user is role in Costumer this method will update according to Costumer information.
      this.serviceAccount.costumer$.asObservable().subscribe(res => {
        this.costumer = res;
        if (!isNull(this.costumer)) {
          console.log('notnull Cost');
          this.isCostumer = true;
        }

      });
      this.checkStatus();

    }
  }

  checkStatus() {

    if (!isNull(this.costumer)) {
      this.isCostumer = true;
      this.isOwner = false;
    } else if (!isNull(this.owner)) {
      this.isOwner = true;
      this.isCostumer = false;
    } else if (isNull(this.owner) && isNull(this.costumer)) {
      this.isOwner = false;
      this.isCostumer = false;
    }
  }

}
