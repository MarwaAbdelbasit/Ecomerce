import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _auth:HttpClient) { }
  register(data:any):Observable<any>{
    return this._auth.post('http://localhost:3000/users/register',data)
  }
}
