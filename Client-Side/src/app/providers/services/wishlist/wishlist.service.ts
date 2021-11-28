import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private commonUrl='http://localhost:3000/users/'
  constructor(private _cart:HttpClient) { }

  toggleWishList(productId:any):Observable<any>{
    return this._cart.patch(`${this.commonUrl}toggleWishList/${productId}`,null)
  }
  getAllWishList():Observable<any>{
    return this._cart.delete(`${this.commonUrl}getAllWishList`)
  }
  deleteAllWishList():Observable<any>{
    return this._cart.get(`${this.commonUrl}deleteAllWishList`)
  }
}
