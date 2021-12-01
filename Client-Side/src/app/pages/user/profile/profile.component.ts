import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
isLoaded=false
  constructor(public _auth:UsersService,) { }

  ngOnInit(): void {
    this._auth.showProfile().subscribe(
      (data:any)=>{
        console.log(data)
        this._auth.userData = data
        this.isLoaded=true
      },
      (err:any)=>{
        console.log(err)
        this._auth.isAuthed=false
      },
      ()=>{
        console.log('done')
        this._auth.isAuthed=true
      }
    )

  }
  ngAfterViewChecked(): void {
  }
}
