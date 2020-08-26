import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  filterFoodURL = 'http://localhost:1050/customer/filterRestaurant/';
  restaurantDetailsURL = 'http://localhost:1050/customer/detailsOfRestaurant/';
  foodDetailsURL = 'http://localhost:1050/customer/detailsOfFood/';
  seachFood(keyword): Observable<any> {
    return this.http.get<Observable<any>>(this.filterFoodURL + keyword);
  }
  getRestaurantDetails(id): Observable<any> {
    return this.http.get<Observable<any>>(this.restaurantDetailsURL + id);
  }
  getFoodDetails(id): Observable<any> {
    return this.http.get<Observable<any>>(this.foodDetailsURL + id);
  }
}
