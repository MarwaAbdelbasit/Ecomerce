import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/providers/services/admin/admin.service';
import { ProductsService } from 'src/app/providers/services/products/products.service';
import { UsersService } from 'src/app/providers/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  isLoaded=false
  allProducts:any[]=[]
  apiURL = environment.apiURL;

  constructor(private _admin:AdminService,private _products:ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
    this._products.getProducts().subscribe(
      data => {
        console.log(data)
        this.allProducts=data.data
        this.isLoaded=true
      },
      error => console.log(error),
      () => console.log('done')
    )
  }
  removeProduct(id: any){
    this._admin.removeProduct(id).subscribe(
      data => {
        console.log(data)
        this.allProducts=this.allProducts.filter(p => p._id != id)
        this.isLoaded=true
      },
      error => console.log(error),
      () => console.log('done')

    )
  }

}
