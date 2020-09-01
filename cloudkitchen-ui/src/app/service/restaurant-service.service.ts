import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  constructor(private http:HttpClient) { }

  public restaurantLogin(data:object):Observable<any>{
    return this.http.post('http://localhost:1050/restaurant/login', data);
  }
 public restaurantRegister(data:object):Observable<any>{
   return this.http.post('http://localhost:1050/restaurant/register',data)
 }
 public getRestaurantDetails():Observable<any>{
  return this.http.get('http://localhost:1050/restaurant/viewRestaurantProfile')

}
}