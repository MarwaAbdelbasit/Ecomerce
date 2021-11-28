import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  admin={
    name: '',
    email:"",
    password:""
  }
  serverErrMsg=""
  msg=''
  constructor(private _auth:UsersService) { }

  ngOnInit(): void {
  }
  login(loginForm:any): void {
    if(loginForm.valid){
      this._auth.login(this.admin).subscribe(
        (response)=>console.log(response),
        (err)=>{
          this.serverErrMsg = err.error.message
          console.log(err.error.message)
        },
        ()=>{console.log("DONE")}
        )
      loginForm.resetForm();
    }
  }
  register(registerForm:any): void {
    if(registerForm.valid){
      this._auth.registerAdmin(this.admin).subscribe(

        (response)=>console.log(response),
        (err)=>{
          this.serverErrMsg = err.error.message
          console.log(err.error.message)
        },
        ()=>{console.log("DONE")}
        )
      registerForm.resetForm();
    }
    else{
      this.msg='some fields are not correct'
    }
  }

}
