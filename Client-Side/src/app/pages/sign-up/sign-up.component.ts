import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  msg=''
  user={
    name: '',
    email:"",
    password:"",
    adress:{
      country:"",
      city:"",
      postalCode:"",
      telephone:"",
    }
  }
  constructor(private _auth:UsersService) { }

  ngOnInit(): void {
  }
  register(registerForm:any): void {
    if(registerForm.valid){
      this._auth.register(this.user).subscribe(
        res=>console.log(res),
        err=>console.log(err),
        ()=>console.log('done'))
      registerForm.resetForm();
    }
    else{
      this.msg='some fields are not correct'
    }
  }
}
