import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alladmins',
  templateUrl: './alladmins.component.html',
  styleUrls: ['./alladmins.component.css']
})
export class AlladminsComponent implements OnInit {
  isLoaded=false
  allAdmins:any[]=[]
  apiURL = environment.apiURL;

  constructor(private _admin:AdminService) { }

  ngOnInit(): void {
    this.getAllAdmins()
  }
  getAllAdmins(){
    this._admin.getAllAdmins().subscribe(
      data => {
        console.log(data)
        this.allAdmins=data.data
        this.isLoaded=true
      },
      error => console.log(error),
      () => console.log('done')
    )
  }

}
