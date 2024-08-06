import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightBooking } from '../shared/FlightBooking';

@Injectable()
export class ViewDetailsService {
  constructor(private http: HttpClient) {}

  view() : Observable<FlightBooking[]> {
    //Consume the exposed URI's specified in QP
    return this.http.get<FlightBooking[]>("http://localhost:1020/bookings");
  }

  delete(id:any) : Observable<any> {
    //Consume the exposed URI's specified in QP
    return this.http.delete<any>("http://localhost:1020/bookings/"+id) ;
  }

}
