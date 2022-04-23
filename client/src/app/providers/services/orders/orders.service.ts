import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private commonUrl='http://localhost:3000/orders/'

  constructor(public _orders:HttpClient) { }

  placeOrder(productId:any, data:any):Observable<any> {
    return this._orders.post(`${this.commonUrl}placeOrder/${productId}`, data)
  }

  editOrder(orderId:any, data:any):Observable<any> {
    return this._orders.patch(`${this.commonUrl}editOrder/${orderId}`, data)
  }

  showAllOrders():Observable<any> {
    return this._orders.get(`${this.commonUrl}showAllOrders/`)
  }

  delOrder(orderId:any):Observable<any> {
    return this._orders.delete(`${this.commonUrl}delOrder/${orderId}`)
  }

  delOrders():Observable<any> {
    return this._orders.delete(`${this.commonUrl}delOrders/`)
  }

  // outer.delete('/delOrders', auth('User'), orderController.delOrders)
// router.delete('/delOrder/:orderId', auth('User'), orderController.delOrder)

}
