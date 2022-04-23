import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss'],
})
export class AdminAuthComponent implements OnInit {
  public serverErrMsg: { email: string; password: string } = {
    email: '',
    password: '',
  };
  public passwordMatch: boolean = true;
  public isSubmittedRegister = false;
  public isSubmittedLogin = false;
  public adminLogin = false;
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  public registerationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    position: new FormControl('Manger', [Validators.required]),
  });
  constructor(
    private _auth: UsersService,
    private _admin: AdminService,
    private _router: Router
  ) {
    if (window.location.pathname.includes('login')) {
      this.adminLogin = true;
    }
  }

  ngOnInit(): void {}
  get loginEmail() {
    return this.loginForm.get('email');
  }
  get loginPassword() {
    return this.loginForm.get('password');
  }
  get registerEmail() {
    return this.registerationForm.get('email');
  }
  get registerPassword() {
    return this.registerationForm.get('password');
  }
  signUp(): void {
    this.isSubmittedRegister = true;
    if (this.registerationForm.valid) {
      if (
        this.registerationForm.value.password ===
        this.registerationForm.value.confirm_password
      ) {
        this._admin.registerAdmin(this.registerationForm.value).subscribe(
          (res) => {
            console.log(res);
            localStorage.setItem('adminToken', res.data.tokens[0].token);
          },
          (err) => {
            this.serverErrMsg.email = err.error.message.email;
            this.serverErrMsg.password = err.error.message.password;
            console.log(err);
          },
          () => {
            this._auth.showProfile().subscribe(
              (data: any) => {
                this._admin.adminData = data;
                this._admin.adminAuthed = true;
              },
              (err: any) => {
                console.log(err);
              },
              () => {
                this._router.navigateByUrl('/admin');
                this.registerationForm.reset();
                this.isSubmittedRegister = false;
              }
            );
          }
        );
      } else {
        this.passwordMatch = false;
      }
    }
  }
  login(): void {
    this.isSubmittedLogin = true;
    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('adminToken', res.data.tokens[0].token);
        },
        (err) => {
          this.serverErrMsg.email = err.error.message.email;
          this.serverErrMsg.password = err.error.message.password;
          console.log(err);
        },
        () => {
          this._auth.showProfile().subscribe(
            (data: any) => {
              console.log(data);
              this._admin.adminData = data;
            },
            (err: any) => {
              console.log(err);
              this._admin.adminAuthed = false;
            },
            () => {
              console.log('done');
              this._admin.adminAuthed = true;
              this.isSubmittedLogin = false;
              this._router.navigateByUrl('/admin');
              this.loginForm.reset();
            }
          );
        }
      );
    } else {
      console.log('not valid');
    }
  }
}
