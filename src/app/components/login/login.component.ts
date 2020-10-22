import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  headers; any;

  constructor(
    private service: AuthenticationService,
    private formBuilder: FormBuilder,
    private tokenservice: TokenStorageService
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
      const keys =data.headers.keys();
      this.headers = keys.map(key=>`${key}: ${data.headers.get(key)}`)
    console.log(this.headers)});
  }
}
