import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  isLoaded=false
  allUsers:any[]=[]
  apiURL = environment.apiURL;
  constructor(private _admin:AdminService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this._admin.getAllUsers().subscribe(
      data => {
        console.log(data)
        this.allUsers=data.data
        this.isLoaded=true
      },
      error => console.log(error),
      () => console.log('done')
    )
  }
  removeUser(id: any){
    this._admin.removeUser(id).subscribe(
      data => {
        console.log(data)
        this.allUsers=this.allUsers.filter(u => u._id != id)
        this.isLoaded=true
      },
      error => console.log(error),
      () => console.log('done')

    )
  }
  
}
