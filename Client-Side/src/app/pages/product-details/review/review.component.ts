import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews:any[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  onRate($event:{newValue:number, starRating:StarRatingComponent}) {
    alert(` 
      New Value: ${$event.newValue}`);
  }
}
