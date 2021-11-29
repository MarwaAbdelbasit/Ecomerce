import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  apiURL = environment.apiURL;
  products:any[]=[]
  constructor(private _products: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this._products.getProducts().subscribe(
      data =>this.products = data.data,
      err=>console.log(err)
      )
  }
}
