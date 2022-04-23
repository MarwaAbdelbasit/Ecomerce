import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
isLoaded=false
  constructor(private _orders:AdminService) { }

  ordersList:any[]=[]
  apiURL = environment.apiURL;

  ngOnInit(): void {
    this._orders.allOrdersAdmin().subscribe(
      (res)=>{
        this.ordersList = res.data
        console.log(res)
        this.isLoaded=true
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
        console.log("all orders are shown to admin")
      }
    )
  }

  removeOrderItem(orderId:any) {
    // console.log(`userId ${userId}`);

    this._orders.delSingleOrderAdmin(orderId).subscribe(
      (res)=>{
        console.log(res)
        this.ordersList = this.ordersList.filter(o=>o._id!=orderId)
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
        console.log("order deleted")
      }
    )
  }

  clearAllOrders(userId:any) {
    this._orders.delOrdersAdmin(userId).subscribe(
      (res)=>{
        console.log(res)
        this.ordersList = this.ordersList.filter(o=>o.userId._id!=userId)
      },
      (err)=>console.log(err),
      ()=>console.log("user orders deleted")
    )
  }

}
