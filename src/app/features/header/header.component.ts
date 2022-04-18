import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnakbarService, MatSnackBarType } from 'src/app/shared/services/snackbar/snakbar.service';
import { ProfileService } from 'src/app/shared/services/tasks-api/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() userDetails = new EventEmitter<any>()

  singinpage: boolean = true;
  loginPage: boolean = false;

  loginForm: FormGroup;
  subscriptions: Subscription[] = [];
  user: user = {
    age: 0,
    createdAt: '',
    email: '',
    name: '',
    updatedAt: '',
    _id: ''
  };

  constructor(private formBuilder: FormBuilder,
    private profile: ProfileService,
    private snakbar: SnakbarService,
    private router: Router) {
    this.initilizeform()
  }

  ngOnInit(): void {
    /* this.lointoAccount() */
  }

  initilizeform() {
    this.loginForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  loginOrsignin(value: string) {
    this.initilizeform()
    if (value === 'login') {
      this.singinpage = false;
      this.loginPage = true;
      this.loginForm.get('name')?.clearValidators();
    } else {
      this.singinpage = true;
      this.loginPage = false;
      this.loginForm.get('name')?.setValidators(Validators.required);
    }
    this.loginForm.get('name')?.updateValueAndValidity();

  }

  onloginOrsignup() {
    if (this.singinpage) {
      this.createAccount()
    } else {
      this.lointoAccount()
    }
  }

  createAccount() {
    let name = this.loginForm.get('name')?.value
    let email = this.loginForm.get('email')?.value
    let password = this.loginForm.get('password')?.value

    this.subscriptions.push(this.profile.sineUpforTaskAPI(name, email, password).subscribe((response: any) => {
      try {
        if (response.success) {
          this.onSuccessfullogin(response.user)
          this.snakbar.showSnakBar('User account created successfully', MatSnackBarType.success)
        } else {
          this.user = {
            age: 0,
            createdAt: '',
            email: '',
            name: '',
            updatedAt: '',
            _id: ''
          }
          this.snakbar.showSnakBar(response.error, MatSnackBarType.error, 5000)
        }
      } catch (e) {
        this.user = {
          age: 0,
          createdAt: '',
          email: '',
          name: '',
          updatedAt: '',
          _id: ''
        }
        this.snakbar.showSnakBar('Error creating account for ' + email, MatSnackBarType.error, 5000)
      }
    }
    ))
  }

  lointoAccount() {
    let accountdetails = {
      /* email: 'name1@gmail.com',
      password: 'name1@1234' */
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.subscriptions.push(this.profile.login(accountdetails.email, accountdetails.password).subscribe((response: user) => {
      if (response) {
        this.onSuccessfullogin(response)
        this.snakbar.showSnakBar('User details found', MatSnackBarType.success)
      } else {
        this.user = {
          age: 0,
          createdAt: '',
          email: '',
          name: '',
          updatedAt: '',
          _id: ''
        }
        this.snakbar.showSnakBar('Error getting user for ' + accountdetails.email, MatSnackBarType.error)
      }
    }))
  }

  onSuccessfullogin(user: user) {
    this.user = user
    this.userDetails.emit(user)
  }

  logout() {
    this.singinpage = false;
    this.loginPage = false;
    this.subscriptions.push(this.profile.logout().subscribe((response: any) => {
      if (response.success) {
        this.user = {
          age: 0,
          createdAt: '',
          email: '',
          name: '',
          updatedAt: '',
          _id: ''
        }
        this.singinpage = false;
        this.loginPage = true;
        this.snakbar.showSnakBar('Logout successful', MatSnackBarType.success)
        this.router.navigate(['./'])
      } else {
        this.snakbar.showSnakBar('Error', MatSnackBarType.error)
      }
    }))

  }

  navagate(routeName: string) {
    this.router.navigate([routeName])
  }

}
export interface user {
  age: number,
  createdAt: string,
  email: string,
  name: string,
  updatedAt: string,
  _id: string
}