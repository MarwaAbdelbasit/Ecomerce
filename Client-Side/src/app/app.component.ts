import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  admin=false
  ngOnInit(): void {
    if(window.location.href.includes('admin')){
      this.admin=true
    }
  }
}
