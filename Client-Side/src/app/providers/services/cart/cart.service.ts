import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private commonUrl='http://localhost:3000/cart/'
  constructor(private _cart:HttpClient) { }

  addCartItem(productId:any,data:any):Observable<any>{
    return this._cart.post(`${this.commonUrl}addCartItem/${productId}`,data)
  }
  removeCartItem(productId:any):Observable<any>{
    return this._cart.delete(`${this.commonUrl}removeCartItem/${productId}`)
  }
  getMyCart():Observable<any>{
    return this._cart.get(`${this.commonUrl}myCart`)
  }
  editCartAmount(cartItemId:any,data:any):Observable<any>{
    return this._cart.patch(`${this.commonUrl}editCartAmount/${cartItemId}`,data)
  }
  clearCart(productId:any,data:any):Observable<any>{
    return this._cart.patch(`${this.commonUrl}clearCart/${productId}`,data)
  }
}
