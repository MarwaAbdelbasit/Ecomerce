import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg=""
  serverErrMsg=""
  user = {
    email:"",
    password:""
  }

  constructor(private _auth:UsersService) { }

  ngOnInit(): void {
  }

  login(loginForm:NgForm){
    if(loginForm.valid) {
      console.log(this.user);
      this._auth.login(this.user).subscribe(
        (response)=>{console.log(response)},
        (err)=>{
            this.serverErrMsg = err.error.message
            console.log(err.error.message);
        },
        ()=>{console.log("DONE");
        }
      )
      loginForm.resetForm();
    }
    else {
      this.msg = "incorrect form data"
    }
  }

}
