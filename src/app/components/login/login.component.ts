import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {TokenStorageService} from 'src/app/services/token-storage.service';
import * as bcrypt from 'bcryptjs';
import {BehaviorSubject} from 'rxjs';
import {isNull} from 'util';
import {AccountService} from '../../services/account.service';

// Author Koen
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logInStatus: boolean = !isNull(this.tokenservice.getUser());

  constructor(
    private service: AuthenticationService,
    private formBuilder: FormBuilder,
    private tokenservice: TokenStorageService,
    private serviceAccount: AccountService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {

    let salt = '$2a$10$bNKWUpUbmE8FT92ojD2Ybe';
    console.log(salt);
    let username = this.loginForm.value.username;
    let password = bcrypt.hashSync(this.loginForm.value.password, salt);
    console.log(username, password);
    this.service.authenticate(username, password).subscribe((data) => {
      let token = data.headers.get('Authorization');
      console.log(data);
      this.tokenservice.saveToken(token);
      let role: string = this.tokenservice.getRoleToken(token);
      let user = new User(null, username, role);
      this.tokenservice.saveUser(user);

      // Updating behaviorSubject to
      // For getting the User role and Name from other component
      this.service.userChange$.next({email: username, role});
      // Updating the user and getting the information of user from database
      this.serviceAccount.updateUser();

      this.router.navigateByUrl('/MyAccount').finally(
        () => location.reload());
    });
  }
}
