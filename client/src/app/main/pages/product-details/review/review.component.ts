import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { UsersService } from 'src/app/providers/services/users/users.service';
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

  constructor(private _auth:UsersService,private _review:ProductsService) { }

  ngOnInit(): void {
  }
  ngAfterViewChecked(): void {
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
    let addedReview:any={
      rate:this.rate,
      reviewerName:this._auth.userData.name,
      reviewerPic:this._auth.userData.profilePic,
      date:new Date().toLocaleDateString(),
      message:this.reviewForm.value.message
    }
    this._review.addReview(
      this.product._id,addedReview
      ).subscribe(
        () => {
          this.reviews.push(addedReview)
          
        },
        error => console.log(error),
        () => this.reviewForm.reset()
      )
  }
}
