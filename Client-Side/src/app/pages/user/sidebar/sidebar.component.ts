import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
    this.user=this.userData
  }

}
