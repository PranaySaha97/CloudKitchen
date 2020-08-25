import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonServiceService {

  constructor(private http: HttpClient) { }

  public registerDeliveryPerson(data: Object): Observable<any> {
    return this.http.post('http://localhost:1050/deliveryperson/register', data)
  }

  public loginDeliveryPerson(data: Object): Observable<any> {
    return this.http.post('http://localhost:1050/deliveryperson/login', data);
  }
}
