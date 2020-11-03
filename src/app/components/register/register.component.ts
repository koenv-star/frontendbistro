import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

import * as bcrypt from 'bcryptjs';
import { Uitbater } from '../../models/uitbater';
import { Klant } from '../../models/klant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
      rol: ['', Validators.required],
    });
  }

  register() {
    let salt = '$2a$10$bNKWUpUbmE8FT92ojD2Ybe';
    let naam = this.registerForm.value.achternaam;
    let voornaam = this.registerForm.value.naam;
    let email = this.registerForm.value.email;
    let wachtwoord = bcrypt.hashSync(this.registerForm.value.wachtwoord, salt);
    let rol = this.registerForm.value.rol;

    console.log(voornaam, naam, wachtwoord, email, rol);
    if (rol == 'uitbater') {
      let uitbater = new Uitbater(
        email,
        naam,
        voornaam,
        wachtwoord,
        2000.0,
        new Array(),
        new Array()
      );

      this.registerService.registerUitbater(uitbater).subscribe();
      this.registerStatus = true;
    } else {
      let klant = new Klant(
        email,
        naam,
        voornaam,
        wachtwoord,
        1000.0,
        new Array(),
        new Array()
      );

      this.registerService.registerklant(klant).subscribe();
      this.registerStatus = true;
    }

    // this.router.navigateByUrl('/');
  }
}
