import { Component, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() product:any={}
  apiURL = environment.apiURL;
  reviews:any[] = [];
  constructor(private _review:ProductsService) { }

  ngOnInit(): void {
    this.reviews=this.product.reviews;
  }
  onRate($event:{newValue:number, starRating:StarRatingComponent}) {
    this._review.addReview(this.product._id,{rate:$event.newValue})
  }
  createRange(num: number){
    return new Array(num)
  }
}
