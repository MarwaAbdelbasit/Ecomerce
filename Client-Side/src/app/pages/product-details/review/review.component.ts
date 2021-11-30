import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  isSubmitted = false
  rate:any
  reviewForm = new FormGroup({
    message:new FormControl( '' , [Validators.required] )
  })

  constructor(private _review:ProductsService) { }

  ngOnInit(): void {
    console.log(this.product)
    this.reviews=this.product.reviews;
  }
  get message(){return this.reviewForm.get('message')}
  onRate($event:{newValue:number, starRating:StarRatingComponent}) {
    this.rate=$event.newValue
  }
  createRange(num: number){
    return new Array(num)
  }
  addReview(){
    this._review.addReview(
      this.product._id,{
        rate:this.rate,
        message:this.reviewForm.value.message
      }).subscribe(
        data => console.log(data),
        error => console.log(error),
        // () => window.location.reload()
      )
  }
}
