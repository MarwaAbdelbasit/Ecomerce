import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/providers/services/cart/cart.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public router: Router,
    public _auth: UsersService,
    public _cart: CartService
  ) {}
  ngOnInit() {
    this._auth.showProfile().subscribe(
      (data: any) => {
        this._auth.userData = data;
        this._auth.isAuthed = true;
      },
      (err: any) => {
        console.log(err);
      }
    );
    if (this._auth.isAuthed) {
      this._cart.getMyCart().subscribe(
        (data: any) => {
          this._cart.myCartCount = data.data.length;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  handleLogOut() {
    this._auth.logOut().subscribe(
      () => {
        this._auth.isAuthed = false;
        this._auth.userData = null;
        this.router.navigate(['/']);
        localStorage.clear();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
