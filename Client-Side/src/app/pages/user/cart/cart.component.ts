import { Component, OnInit } from '@angular/core';
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

  constructor(private _cart: CartService) { }

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
}
