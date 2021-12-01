import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {
  isLoaded=false
  user:any
  apiURL = environment.apiURL;
  constructor(public _admin:AdminService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._admin.showUser(this._route.snapshot.params['userId']).subscribe(
      (data:any)=>{
        console.log(data)
        this.user = data.data
        this.isLoaded=true
      },
      (err:any)=>{
        console.log(err)
      },
      ()=>{
        console.log('done')
      }
    )

  }

}
