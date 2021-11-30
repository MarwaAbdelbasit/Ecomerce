import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/providers/services/cart/cart.service';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  apiURL = environment.apiURL;
  product:any={}
  constructor(private _products: ProductsService, private _cart:CartService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSingleProduct()
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
        (res)=>{console.log(res)},
        (err)=>{console.log(err)},
        ()=>{console.log("added")}
      )
    }
  }
}
