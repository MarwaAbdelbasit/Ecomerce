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
  clicked1=false
  clicked2=false
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
<<<<<<< HEAD
  showToast1(){
    if(this._auth.isAuthed){
      this.clicked1=true
      setTimeout(
        ()=>this.clicked1=false 
        , 5000);
      
    }
  }
  showToast2(){
    if(this._auth.isAuthed){
      this.clicked2=true
      setTimeout(
        ()=>this.clicked2=false 
        , 5000);
      
    }
=======
showToast(){
  if(this._auth.isAuthed){
    this.clicked=true
    setTimeout(
      ()=>this.clicked=false
      , 5000);

>>>>>>> b8a3240a9e89b506576f6e69eb433f92f870edb6
  }
  addToWishlist(productId:string) {
    this._wishlist.toggleWishList(productId).subscribe(
      (res)=>{
        console.log(res)
<<<<<<< HEAD
=======
        this._wishlist.wishlistCount++
>>>>>>> b8a3240a9e89b506576f6e69eb433f92f870edb6
      },
      (err)=>{
        alert(err.error.message)
        console.log(err.error.message)
      },
      ()=>{console.log("done from add wishlist")}
    )
  }
}
