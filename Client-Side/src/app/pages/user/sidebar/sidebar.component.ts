import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  apiURL = environment.apiURL;
  @Input() userData: any;
  user:any
  constructor(public _auth:UsersService,private _router:Router) { }

  ngOnInit(): void {
    this.user=this.userData
  }
  handleLogOutAll(){
    this._auth.logOutAll().subscribe(
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
