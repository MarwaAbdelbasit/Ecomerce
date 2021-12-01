import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  serverErrMsg:any={
    name:"",
    email:"",
    password:""
  }
  isSubmittedR = false
  isSubmittedL = false
  loginForm = new FormGroup({
    email:new FormControl( '' , [Validators.required, Validators.email] ),
    password: new FormControl('', [Validators.required])
  }) 
  registerForm = new FormGroup({
    name:new FormControl( '' , [Validators.required] ),
    email:new FormControl( '' , [Validators.required, Validators.email] ),
    password: new FormControl('', [Validators.required]),
    position: new FormControl( 'Manger' , [Validators.required])
  }) 
  constructor(private _auth:UsersService,private _admin:AdminService,private _router:Router) { }

  ngOnInit(): void {
  }
  get emailL(){return this.loginForm.get('email')}
  get passwordL(){return this.loginForm.get('password')}

  get nameR(){return this.registerForm.get('name')}
  get emailR(){return this.registerForm.get('email')}
  get passwordR(){return this.registerForm.get('password')}

  register(): void {
    this.isSubmittedR=true
    if(this.registerForm.valid){
      this._admin.registerAdmin(this.registerForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.isSubmittedR=false
          localStorage.setItem('token', res.data.tokens[0].token)
        },
        (err)=>{
          this.serverErrMsg.name = err.error.message.name
          this.serverErrMsg.email = err.error.message.email
          this.serverErrMsg.password = err.error.message.password
          console.log(err)
        },
        ()=>{
          this._auth.showProfile().subscribe(
            (data:any)=>{
              console.log(data)
              this._admin.adminData = data
            },
            (err:any)=>{
              console.log(err)
              this._admin.adminAuthed=false
            },
            ()=>{
              console.log('done')
              this._admin.adminAuthed=true
              this.loginForm.reset()
              this._router.navigateByUrl('/admin')
                    }
          )
        }
        )
      this.registerForm.reset();
    }
  }
  login(): void {
    this.isSubmittedL=true
    if(this.loginForm.valid){
      this._auth.login(this.loginForm.value).subscribe(
        (res)=>{
          console.log(res);
          localStorage.setItem('token', res.data.tokens[0].token)
        },
        (err)=>{
          this.serverErrMsg.email = err.error.message.email
          this.serverErrMsg.password = err.error.message.password
          console.log(err)
        },
        ()=>{
          this._auth.showProfile().subscribe(
            (data:any)=>{
              console.log(data)
              this._admin.adminData = data
            },
            (err:any)=>{
              console.log(err)
              this._admin.adminAuthed=false
            },
            ()=>{
              console.log('done')
              this._admin.adminAuthed=true
              this.loginForm.reset()
              this.isSubmittedL=false
              this._router.navigateByUrl('/admin')
                }
          )
        }
        )
      this.loginForm.reset();
    }
    else{
      console.log('not valid')
    }
  }

}
