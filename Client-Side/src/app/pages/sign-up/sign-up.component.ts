import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSubmitted:Boolean = false
  invalidData = false
  serverErrMsg=""
  registerForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    adress:new  FormGroup({
      country:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      postalCode:new FormControl('', [Validators.required]),
      telephone:new FormControl('', [Validators.required])
    }),
  })

  get name(){return this.registerForm.get('name')}
  get email(){return this.registerForm.get('email')}
  get password(){return this.registerForm.get('password')}
  get country(){return this.registerForm.get('adress')?.get('country')}
  get city(){return this.registerForm.get('adress')?.get('city')}
  get postalCode(){return this.registerForm.get('adress')?.get('postalCode')}
  get telephone(){return this.registerForm.get('adress')?.get('telephone')}

  constructor(private _auth:UsersService) { }

  ngOnInit(): void {
  }

  register(): void {
    if(this.registerForm.valid){
      this._auth.register(this.registerForm.value).subscribe(
        (response)=>console.log(response),
        (err)=>{
          this.invalidData = true
          this.serverErrMsg = err.error.message
          console.log(err.error.message)
        },
        ()=>{
          this.isSubmitted = true
          this.registerForm.reset()
          console.log("DONE")
        }
      )
    }
  }
}
