import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  isLoaded=false
  products:any[]=[]
  apiURL = environment.apiURL;
  page=1
  constructor(private _products:ProductsService) { }
  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
    this._products.getProducts(this.page).subscribe(
      data => {
        console.log(data)
        this.products=data.data
        this.isLoaded=true
      },
      error => console.log(error),
      () => console.log('done')
    )
  }
  removeProduct(id: any){
    this._products.removeProduct(id).subscribe(
      data => {
        console.log(data)
        this.products=this.products.filter(p => p._id != id)
        this.isLoaded=true
      },
      error => console.log(error),
      () => console.log('done')

    )
  }
  nextPage(){
    this.page=this.page+1
    this._products.getProducts(this.page).subscribe(
      data =>this.products = data.data,
      err=>console.log(err)
      )
    }
  prevPage(){
    this.page=this.page-1
    this._products.getProducts(this.page).subscribe(
      data =>this.products = data.data,
      err=>console.log(err)
      )
    }
    paging(page:number){
      this.page=page
      this._products.getProducts(this.page).subscribe(
        data =>this.products = data.data,
        err=>console.log(err)
        )
      }
}
