import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/providers/services/orders/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersList:any[]=[]
  apiURL = environment.apiURL;

  constructor(private _orders:OrdersService) { }

  ngOnInit(): void {
    this._orders.showAllOrders().subscribe(
      (res)=>{
        this.ordersList = res.data
        console.log(res.data);
      },
      (err)=>console.log(err),
      ()=>console.log("orders shown")
    )
  }

  removeOrderItem(orderId:any) {
    this._orders.delOrder(orderId).subscribe(
      (res)=>{
        console.log(res.data);
        this.ordersList = this.ordersList.filter(o=>o._id!=orderId)
      },
      (err)=>console.log(err),
      ()=>console.log("single order deleted")
    )
  }

  clearAllOrders() {
    this._orders.delOrders().subscribe(
      (res)=>{
        this.ordersList = []
      },
      (err)=>console.log(err),
      ()=>console.log("all orders deleted")
    )
  }

}
