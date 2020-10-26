import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginstatus: boolean = this.tokenservice.getUser();
  constructor(
    private service: AuthenticationService,
    private formBuilder: FormBuilder,
    private tokenservice: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    console.log(username, password);
    this.service.authenticate(username, password).subscribe((data) => {
      let token = data.headers.get('Authorization');
      this.tokenservice.saveToken(token);
      this.tokenservice.saveUser(new User(username, null, null));
      // this.router.navigateByUrl('/');
    });
  }
}
