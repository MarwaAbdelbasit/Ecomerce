import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users/users.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSubmitted:Boolean = false
  invalidData = false
  cities:any[]=[]
  serverErrMsg:any={
    name:"",
    email:"",
    password:""
  }
  registerForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    security:new FormGroup({
      securityQuestion:new FormControl('',[Validators.required]),
      answer:new FormControl('', [Validators.required])
    }),
    adress:new  FormGroup({
      city:new FormControl('', [Validators.required]),
      postalCode:new FormControl('', [Validators.required]),
      telephone:new FormControl('', [Validators.required,Validators.minLength(11)])
    }),
  })

  get name(){return this.registerForm.get('name')}
  get email(){return this.registerForm.get('email')}
  get password(){return this.registerForm.get('password')}
  get country(){return this.registerForm.get('adress')?.get('country')}
  get securityQuestion(){return this.registerForm.get('security')?.get('securityQuestion')}
  get answer(){return this.registerForm.get('security')?.get('answer')}
  get city(){return this.registerForm.get('adress')?.get('city')}
  get postalCode(){return this.registerForm.get('adress')?.get('postalCode')}
  get telephone(){return this.registerForm.get('adress')?.get('telephone')}

  constructor(private _auth:UsersService,private _router:Router) { }
  isLoaded=false
  ngOnInit(): void {
    this.getCities()
  }  
  ngAfterViewChecked(): void {

  }
  getCities():void{
    this._auth.getCities().subscribe(
      data =>{
        console.log(data)
        this.cities = data.data
        this.isLoaded=true
      })
  }
  register(): void {
    this.isSubmitted=true
    if(this.registerForm.valid){
      this._auth.register(this.registerForm.value).subscribe(
        (res)=>{
          console.log(res);
          localStorage.setItem('token', res.data.tokens[0].token)
        },
        (err)=>{
          this.invalidData = true
          this.serverErrMsg.name = err.error.message.name
          this.serverErrMsg.email = err.error.message.email
          this.serverErrMsg.password = err.error.message.password
          console.log(err.error.message)
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
              this.registerForm.reset()
              this.isSubmitted=false
              this._router.navigateByUrl('/user/profile')
            }
          )
        }
      )
    }
  }
}
