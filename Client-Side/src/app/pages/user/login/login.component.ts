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
  serverErrMsg:any={
    email:"",
    password:""
  }
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
      this._auth.login(this.loginForm.value).subscribe(
        (res)=>{
          console.log(res);
          localStorage.setItem('token', res.data.tokens[0].token)
        },
        (err)=>{
          this.serverErrMsg.email = err.error.message.email
          this.serverErrMsg.password = err.error.message.password
          console.log(this.serverErrMsg,err)
          this.invalidData=true
        },
        ()=>{
          this._auth.showProfile().subscribe(
            (data:any)=>{
              console.log(data)
              this._auth.userData = data
            },
            (err:any)=>{
              console.log(err)
              this._auth.isAuthed=false
            },
            ()=>{
              console.log('done')
              this._auth.isAuthed=true
              this.loginForm.reset()
              this.isSubmitted=false
              this._router.navigateByUrl('/user/profile')
            }
          )
        }
      )
    }
  }
handleCheck(){
  if(this.loginForm.invalid){
    this.serverErrMsg.email = "some data are missing"
  }
}
}
