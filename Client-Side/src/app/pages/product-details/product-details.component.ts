import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  apiURL = environment.apiURL;
  product:any={}
  constructor(private _products: ProductsService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSingleProduct()
  }
  getSingleProduct(){
    this._products.getSingleProduct(this._route.snapshot.params['productId']).subscribe(
      data =>this.product = data.data,
      err=>console.log(err))
  }
}
