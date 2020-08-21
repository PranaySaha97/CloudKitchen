import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://localhost:1050/filterRestaurant';

  constructor(private http: HttpClient) { }
  seachFood(keyword): Observable<any> {
    return this.http.get<Observable<any>>(this.url + keyword);
  }
}
