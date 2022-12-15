import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/userservice.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hero = { firstname: '', lastname: '', username: '', email: '',phone: '',sexe: '',profession: '',password: '',confirmepassword: '',datenaissance:''};
  signup!: FormGroup;

  ngOnInit(): void {
    this.signup = new FormGroup({
      firstname: new FormControl(this.hero.firstname, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl(this.hero.lastname, [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl(this.hero.username, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(this.hero.email, [
        Validators.required,
        Validators.minLength(4),
      ]),
      datenaissance: new FormControl(this.hero.datenaissance, [
        Validators.required,
        Validators.minLength(4),
      ]),
      phone: new FormControl(this.hero.phone, [
        Validators.required,
        Validators.minLength(8),

      ]),
      sexe: new FormControl(this.hero.sexe, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(this.hero.password, [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmepassword: new FormControl(this.hero.confirmepassword, [
        Validators.required,
        Validators.minLength(5),
      ]),
      profession: new FormControl(this.hero.profession, [
        Validators.required,
        Validators.minLength(4),
      ]),
  })
}

  get firstname() { return this.signup.get('firstname')!; }
  get lastname() { return this.signup.get('lastname')!; }
  get username() { return this.signup.get('username')!; }
  get confirmepassword() { return this.signup.get('confirmepassword')!; }
  get password() { return this.signup.get('password')!; }
  get sexe() { return this.signup.get('sexe')!; }
  get email() { return this.signup.get('email')!; }
  get profession() { return this.signup.get('profession')!; }
  get phone() { return this.signup.get('phone')!; }
  get datenaissance() { return this.signup.get('datenaissance')!; }

  data:any;
  constructor(private userservice:UserService,private router:Router) { }
  signupMethode(): void {

    this.userservice.signup(this.signup.value).subscribe(res => {
      this.data=res;
    }
    )
    this.router.navigate(['/accueil']);

  alert("Bienvenu chez Education ! Vous êtes inscrit avec succès ")

  }
}











