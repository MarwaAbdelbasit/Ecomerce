import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public _auth:UsersService,private _router:Router) { }

  ngOnInit(): void {
      this._auth.showProfile().subscribe(
        (data:any)=>{
          this._auth.userData = data
        },
        (err:any)=>{
          console.log(err)
          this._auth.isAuthed=false
        },
        ()=>{
          this._auth.isAuthed=true
        }
      )
    }
handleLogOut(){
  this._auth.logOut().subscribe(
    (data:any)=>{
      console.log(data)
      this._auth.userData = null
    },
    (err:any)=>{
      console.log(err)
    },
    ()=>{
      console.log('done')
      this._auth.isAuthed=false
      localStorage.clear()
      this._router.navigateByUrl('/user/login')
    }
  )
}
}
