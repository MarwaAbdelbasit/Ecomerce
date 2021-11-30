import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() message: any;
clicked=false
  constructor() { }

  ngOnInit(): void {
  }
showToast(): void {
this.clicked=true
setTimeout(
  ()=>this.clicked=false 
  , 5000);
}
}
