import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private commonUrl='http://localhost:3000/wishlist/'
  constructor(private _wishlist:HttpClient) { }

  toggleWishList(productId:any):Observable<any>{
    return this._wishlist.post(`${this.commonUrl}toggleWishList/${productId}`,null)
  }
  getAllWishList():Observable<any>{
    return this._wishlist.get(`${this.commonUrl}getAllWishList`)
  }
  deleteAllWishList():Observable<any>{
    return this._wishlist.delete(`${this.commonUrl}deleteAllWishList`)
  }
}
