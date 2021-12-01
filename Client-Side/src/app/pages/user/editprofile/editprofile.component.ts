import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  apiURL = environment.apiURL;
  file:any;
  isLoaded=false
  myForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    adress:new FormGroup({
      country:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      postalCode:new FormControl('',[Validators.required]),
      telephone:new FormControl('',[Validators.required]),
    }),
    paymentDetails:new FormGroup({
      creditCard:new FormControl('',[Validators.required]),
    })
  })
  myForm2=new FormGroup({
    password:new FormControl('',[Validators.required]),
    password1:new FormControl('',[Validators.required]),
    password2:new FormControl('',[Validators.required]),
  })
  serverErrMsg:any={
    password:""
  }

  constructor(public _auth:UsersService,private _router:Router) { }

  ngOnInit(): void {
    this.isLoaded=true
  }
  ngAfterViewChecked(): void {
    this.myForm.patchValue(this._auth.userData)
  }
  handleEdit(){
    this._auth.editProfile(this.myForm.value).subscribe(
      (res)=>{
        console.log(res);
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
        console.log('done')
      }
    )

  }
  handleEditPassword(){
    if(this.myForm2.value.password1==this.myForm2.value.password2){
      this._auth.editPassword(this.myForm2.value.password1,this.myForm2.value.password).subscribe(
        (res)=>{
          console.log(res);
        },
        (err)=>{
          this.serverErrMsg.password = err.error.message.password
          console.log(this.serverErrMsg,err)
        },
        ()=>{
          this.myForm2.reset()
          console.log('done')
        }
      )
    }
    else{
      this.serverErrMsg.password="Password Doesn't match"
      console.log('password failed to update')
    }
  }
  handleChange(event:any){
    this.file=event.target.files[0]
  }
  uploadImage(){
  const data=new FormData();
  data.append('img',this.file,this.file.name)
  this._auth.uploadImage(data).subscribe(
    data=>{
      console.log(data)
      this._auth.userData.profilePic=data.data
    },
    err=>console.log(err),
    ()=>{
      console.log('done')
    }
  )
  }
  
}
