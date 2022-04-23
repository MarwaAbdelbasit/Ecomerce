import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/providers/services/cart/cart.service';
import { OrdersService } from 'src/app/providers/services/orders/orders.service';
// import { UsersService } from 'src/app/providers/services/users/users.service';
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

  constructor(
    private _cart: CartService,
    private _orders:OrdersService,
    // private _user:UsersService,
    private _route:Router) { }

  ngOnInit(): void {
    this.getCart()
    // this.getUserData()
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

// getUserData() {
//   this._user.showProfile().subscribe(
//     (res)=>console.log(res.data),
//     (err)=>console.log(err),
//     ()=>console.log("ensan")
//   )
// }

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

placeOrder(productId:any) {
  let product = this.myCart.find(item=>item.productId._id==productId).productId
  let user = this.myCart.find(item=>item.productId._id==productId).userId
  let amount = this.myCart.find(i=>i.productId._id==productId).amount
  console.log(user);


  this._orders.placeOrder(productId, {
    amount:amount,
    shipping: {
      shippedTo:user.name,
      adress:`${user.adress.city} - ${user.adress.country} - postal code: ${user.adress.postalCode}`
    }
  }).subscribe(
    (res)=>{console.log(res.data)},
    (err)=>{console.log(err)},
    ()=>{console.log("oreder placed")}
  )
}

}
