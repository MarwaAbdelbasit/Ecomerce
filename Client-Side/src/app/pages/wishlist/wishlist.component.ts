import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/providers/services/wishlist/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _wishlist:WishlistService) { }

myWishlist:any[] = []
apiURL = environment.apiURL;

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
}
