import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/providers/services/cart/cart.service';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  apiURL = environment.apiURL;
  products:any[]=[]
  constructor(private _products: ProductsService,private _cart:CartService) { }
  serverErrMsg=''
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this._products.getProducts().subscribe(
      data =>this.products = data.data,
      err=>console.log(err)
      )
  }
  addToCart(product:any){
    this._cart.addCartItem(product._id,{
      price:product.price,discount:product.discount.percent
    }).subscribe(
      (res)=>console.log(res),
      err=>{
        this.serverErrMsg='You Have to Login First'
        console.log(err);
      },
      ()=>console.log('done')
      )
  }
}
