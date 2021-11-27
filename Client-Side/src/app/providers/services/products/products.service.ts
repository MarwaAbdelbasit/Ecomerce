import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _products:HttpClient) { }
  getProducts():Observable<any>{
    return this._products.get('http://localhost:3000/products/allProducts')
  }
  getSingleProduct(productId:string):Observable<any>{
  
    return this._products.get(`http://localhost:3000/products/singleProduct/${productId}`)
  }
  
}
