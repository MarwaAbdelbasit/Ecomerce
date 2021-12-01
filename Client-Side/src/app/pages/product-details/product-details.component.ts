import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/providers/services/cart/cart.service';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { WishlistService } from 'src/app/providers/services/wishlist/wishlist.service';
import { environment } from 'src/environments/environment';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  apiURL = environment.apiURL;
  isLoaded=false
  isFailed=false
  clicked=false
  product:any={}
  // wishlistErr:string = ""
  constructor(
    public _auth:UsersService,
    private _products: ProductsService,
    private _cart:CartService,
    private _wishlist:WishlistService,
    private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSingleProduct()
    this.isLoaded=true
  }
  getSingleProduct(){
    this._products.getSingleProduct(this._route.snapshot.params['productId']).subscribe(
      data =>{
        this.product = data.data},
      err=>console.log(err))
  }
  addToCart(productId:string) {
    if(this.product == null) {
      console.log("product is empty");
    }
    else {
      this._cart.addCartItem(productId, {
        price:this.product.price, discount:this.product.discount.percent
      }).subscribe(
        (res)=>{
          console.log(res)
          this._cart.myCartCount=this._cart.myCartCount+1
        },
        (err)=>{
          this.isFailed=true
          console.log(err)
          setTimeout(()=>{
            this.isFailed=false
          },2000)
        },
        ()=>{console.log("added")}
      )
    }
  }
showToast(){
  if(this._auth.isAuthed){
    this.clicked=true
    setTimeout(
      ()=>this.clicked=false 
      , 5000);
    
  }
}
  addToWishlist(productId:string) {
    this._wishlist.toggleWishList(productId).subscribe(
      (res)=>{console.log(res)},
      (err)=>{
        alert(err.error.message)
        console.log(err.error.message)
      },
      ()=>{console.log("done from add wishlist")}
    )
  }
}
