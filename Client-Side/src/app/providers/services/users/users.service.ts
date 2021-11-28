import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private commonUrl='http://localhost:3000/users/'
  constructor(private _auth:HttpClient) { }

  register(data:any):Observable<any>{
    return this._auth.post(`${this.commonUrl}register`,data)
  }
  registerAdmin(data:any):Observable<any>{
    return this._auth.post(`${this.commonUrl}registerAdmin`,{...data,role:"Admin"})
  }
  login(data:any):Observable<any>{
    return this._auth.post(`${this.commonUrl}login`,data)
  }
}
