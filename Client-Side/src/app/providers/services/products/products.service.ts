import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private commonUrl='http://localhost:3000/products/'
  constructor(private _products:HttpClient) { }
  getProducts(page:any):Observable<any>{
    return this._products.get(`${this.commonUrl}allProducts/${page}`)
  }
  getSingleProduct(productId:string):Observable<any>{
  
    return this._products.get(`${this.commonUrl}singleProduct/${productId}`)
  }
  addReview(productId:string,addedReview:any):Observable<any>{
    return this._products.patch(`${this.commonUrl}addReview/${productId}`,addedReview)
  }
  removeProduct(productId:any):Observable<any>{
    return this._products.delete(`${this.commonUrl}delProduct/${productId}`)
  }
  addProduct(product:any):Observable<any>{
    return this._products.post(`${this.commonUrl}addProduct/`,product)
  }
  editProduct(product:any,productId:any):Observable<any>{
    return this._products.patch(`${this.commonUrl}editProduct/${productId}`,product)
  }
  uploadImage(data:any,productId:any){
    return this._products.patch(`${this.commonUrl}uploadImage/${productId}`,data)

  }

}
