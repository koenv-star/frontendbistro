import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as bcrypt from 'bcryptjs';

// Author Koen
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

    let salt = '$2a$10$bNKWUpUbmE8FT92ojD2Ybe';
    console.log(salt);
    let username = this.loginForm.value.username;
    let password = bcrypt.hashSync(this.loginForm.value.password, salt);
    console.log(username, password);
    this.service.authenticate(username, password).subscribe((data) => {
      let token = data.headers.get('Authorization');
      console.log(data);
      this.tokenservice.saveToken(token);
      let role = this.tokenservice.getRoleToken(token);
      this.tokenservice.saveUser(new User(null,username,role));
      this.router.navigateByUrl('');
    });
  }
}
