import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { UsersService } from 'src/app/providers/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
  apiURL = environment.apiURL;
  isLoaded=false
  constructor(public _admin:AdminService,private _auth:UsersService,private _router:Router) { }

  ngOnInit(): void {
    this._auth.showProfile().subscribe(
      (data:any)=>{
        console.log(data)
        this._admin.adminData = data
        this.isLoaded=true
      },
      (err:any)=>{
        console.log(err)
        this._admin.adminAuthed=false
      },
      ()=>{
        console.log('done')
        this._admin.adminAuthed=true
      }
    )

  }
  handleLogOut(){
    this._auth.logOut().subscribe(
      (data:any)=>{
        console.log(data)
        this._admin.adminData = null
      },
      (err:any)=>{
        console.log(err)
      },
      ()=>{
        console.log('done')
        this._admin.adminAuthed=false
        localStorage.clear()
        this._router.navigateByUrl('/admin/register')
      }
    )
  }
  
}
