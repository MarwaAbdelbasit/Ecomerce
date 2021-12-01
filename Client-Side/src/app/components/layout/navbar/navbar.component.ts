import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/providers/services/cart/cart.service';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public _auth:UsersService,
    public _cart:CartService,
    private _router:Router,
    ) { }
  className: string=''
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
      this._cart.getMyCart().subscribe(
        data => {
          console.log(data)
          console.log(this._cart.myCartCount)
          this._cart.myCartCount=data.data.length
        },
        error => console.log(error),
        () => console.log('done')
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
expanded(){
this.className='expand'
}
dispanded(){
  this.className=''
}
}
