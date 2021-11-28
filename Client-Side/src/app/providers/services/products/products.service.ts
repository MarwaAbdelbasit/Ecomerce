import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private commonUrl='http://localhost:3000/products/'
  constructor(private _products:HttpClient) { }
  getProducts():Observable<any>{
    return this._products.get(`${this.commonUrl}allProducts`)
  }
  getSingleProduct(productId:string):Observable<any>{
  
    return this._products.get(`${this.commonUrl}singleProduct/${productId}`)
  }
  addReview(productId:string,rate:any):Observable<any>{
    return this._products.patch(`${this.commonUrl}addReview/${productId}`,rate)
  }
  
}
