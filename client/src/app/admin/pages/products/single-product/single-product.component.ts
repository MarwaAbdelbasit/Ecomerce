import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  isLoaded=false
  apiURL = environment.apiURL;
product:any
  constructor(private _product:ProductsService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._product.getSingleProduct(this._route.snapshot.params['productId']).subscribe(
      (data:any)=>{
        console.log(data)
        this.product = data.data
        this.isLoaded=true
      },
      (err:any)=>{
        console.log(err)
      },
      ()=>{
        console.log('done')
      }
    )

  }
  createRange(num: number){
    return new Array(num)
  }

}
