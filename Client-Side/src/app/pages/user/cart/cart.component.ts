import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/providers/services/cart/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoaded=false
  myCart:any[]=[]
  apiURL = environment.apiURL;
  public editButtonPressed:Boolean = false
  newAmount:any

  constructor(private _cart: CartService, private _route:Router) { }

  ngOnInit(): void {
    this.getCart()
  }
getCart(){
  this._cart.getMyCart().subscribe(
    data => {
      console.log(data)
      this.myCart=data.data
      this.isLoaded=true
    },
    error => console.log(error),
    () => console.log('done')
  )
}
removeCartItem(id: any){
  this._cart.removeCartItem(id).subscribe(
    data => {
      console.log(data)
      this.myCart=this.myCart.filter(ci => ci._id != id)
      this._cart.myCartCount=this._cart.myCartCount-1
    },
    error => console.log(error),
    () => console.log('done')
  )
}

editCartItem() {
  console.log("edit cart item");
  this.editButtonPressed = true
}
editItemAmount(cartItemId:string, event:any) {
  console.log(cartItemId);
  console.log(event.target.value);

  this._cart.editCartAmount(cartItemId, {amount:event.target.value}).subscribe(
    (res)=>{
      console.log(res)
    },
    (err)=>{
      console.log(err.error.message)
      console.log(err)
    },
    ()=>{
      console.log("amount edited")
      this._route.navigateByUrl('/user/cart')
    }
  )
}
}
