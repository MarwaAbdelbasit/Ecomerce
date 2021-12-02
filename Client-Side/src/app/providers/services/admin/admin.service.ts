import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public adminAuthed = false
  public adminData:any = null
  private commonUrl='http://localhost:3000/users/'
  private commonProductsUrl='http://localhost:3000/products/'
  private commonOrdersUrl = 'http://localhost:3000/orders/'

  constructor(private _auth:HttpClient) { }
  registerAdmin(data:any):Observable<any>{
    return this._auth.post(`${this.commonUrl}registerAdmin`,{...data,role:"Admin"})
  }
  getAllUsers():Observable<any>{
    return this._auth.get(`${this.commonUrl}showAllUsers`)
  }
  removeUser(userId:any):Observable<any>{
    return this._auth.delete(`${this.commonUrl}deleteUser/${userId}`)
  }
  removeProduct(productId:any):Observable<any>{
    return this._auth.delete(`${this.commonUrl}delProduct/${productId}`)
  }
  getAllAdmins():Observable<any>{
    return this._auth.get(`${this.commonUrl}showAllAdmins`)
  }
  showUser(userId:any):Observable<any>{
    return this._auth.get(`${this.commonUrl}showUser/${userId}`)
  }
  addProduct(product:any):Observable<any>{
    return this._auth.post(`${this.commonProductsUrl}addProduct/`,product)
  }

  //----------------admin options to control orders ----------------
  allOrdersAdmin():Observable<any> {
    return this._auth.get(`${this.commonOrdersUrl}allOrdersAdmin`)
  }
  delSingleOrderAdmin(orderId:any):Observable<any> {
    return this._auth.delete(`${this.commonOrdersUrl}delSingleOrderAdmin/${orderId}`)
  }
  delOrdersAdmin(userId:any):Observable<any> {
    return this._auth.delete(`${this.commonOrdersUrl}delOrdersAdmin/${userId}`)
  }
}
