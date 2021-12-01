import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public isAuthed = false
  public userData:any = null
  private commonUrl='http://localhost:3000/users/'
  constructor(private _auth:HttpClient) { }

  register(data:any):Observable<any>{
    return this._auth.post(`${this.commonUrl}register`,data)
  }
  login(data:any):Observable<any>{
    return this._auth.post(`${this.commonUrl}login`,data)
  }
  showProfile():Observable<any>{
    return this._auth.get(`${this.commonUrl}showProfile`)
  }
  editProfile(userData: any){
    return this._auth.patch(`${this.commonUrl}editProfile`, userData)
  }
  editPassword(newPassword:any,oldPassword:any):Observable<any>{
    return this._auth.patch(`${this.commonUrl}editPassword`,{oldPassword,newPassword})
  }
  logOut():Observable<any>{
    return this._auth.post(`${this.commonUrl}logout`,null)
  }
  logOutAll():Observable<any>{
    return this._auth.post(`${this.commonUrl}logoutAll`,null)
  }
  getCities():Observable<any>{
    return this._auth.get('http://localhost:3000/cities')
  }
  uploadImage(data:any):Observable<any>{
    return this._auth.patch(`${this.commonUrl}changeImage`,data)
  }

}
