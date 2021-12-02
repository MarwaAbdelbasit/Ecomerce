import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/providers/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersList:any[]=[]

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

}
