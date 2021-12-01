import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/providers/services/cart/cart.service';
import { WishlistService } from 'src/app/providers/services/wishlist/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    private _wishlist:WishlistService,
    private _cart:CartService) { }

myWishlist:any[] = []
apiURL = environment.apiURL;
product:any={}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this._wishlist.getAllWishList().subscribe(
      data => {
        console.log(data)
        this.myWishlist=data.data
      },
      error => console.log(error),
      () => console.log('done')
    )
  }

  removelistItem(id:any) {
    this._wishlist.delSingleWishlist(id).subscribe(
      (res)=>{
        console.log(res.data)
        this.myWishlist = this.myWishlist.filter(i=>i._id!=id)
        this._wishlist.wishlistCount--
      },
      (err)=>{console.log(err.error.message)},
      ()=>{console.log("done delete single item")}
    )
  }


}
