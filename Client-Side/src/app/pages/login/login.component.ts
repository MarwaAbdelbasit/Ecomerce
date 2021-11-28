import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serverErrMsg:string=""
  isSubmitted = false
  invalidData = false
  loginForm = new FormGroup({
    email:new FormControl( '' , [Validators.required, Validators.email] ),
    password: new FormControl('', [Validators.required])
  })

  constructor(private _auth:UsersService, private _router:Router) { }

  ngOnInit(): void {
  }

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  login(){
    if(this.loginForm.valid) {
      console.log(this.loginForm);
      this._auth.login(this.loginForm.value).subscribe(
        (res)=>{
          console.log(res)
          localStorage.setItem('token',res.data.tokens[0].token)
        },
        (err)=>{
          this.serverErrMsg = err.error.message
          console.log(err)
          this.invalidData=true
        },
        ()=>{
          this.loginForm.reset()
          this.isSubmitted=false
          this._router.navigateByUrl('/')
        }
      )
    }
  }

}
