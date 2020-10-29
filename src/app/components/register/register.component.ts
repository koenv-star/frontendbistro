import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Costumer } from 'src/app/models/costumer';
import { Owner } from 'src/app/models/owner';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterService } from 'src/app/services/register.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  newCostumer: Costumer;
  newOwner: Owner;
  registerStatus = false;
  // bcrypt = require('bcrypt');
  // private service: RegisterService,
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      naam: ['', Validators.required],
      achternaam: ['', Validators.required],
      email: ['', Validators.required],
      wachtwoord: ['', Validators.required],
      heremail: ['', Validators.required],
      herwachtwoord: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  register() {
    let salt = '$2a$10$bNKWUpUbmE8FT92ojD2Ybe';
    let naam = this.registerForm.value.naam;
    let achternaam = this.registerForm.value.achternaam;
    let email = this.registerForm.value.email;
    let wachtwoord = bcrypt.hashSync(this.registerForm.value.wachtwoord, salt);
    let rol = this.registerForm.value.rol;

    console.log(naam, achternaam, wachtwoord, email, rol);
    if (rol == 'uitbater') {
      let owner = new Owner(naam,
        achternaam,
        email,
        wachtwoord,
        2000.0,
        null, null, null);

      this.registerService.registerUitbater(owner).subscribe();
    } else {
      let costumer = new Costumer(naam,
        achternaam,
        email,
        wachtwoord,
        1000.0,
        null, null);

      this.registerService.registerklant(costumer).subscribe();
    }

    // this.router.navigateByUrl('/');
  }
}
