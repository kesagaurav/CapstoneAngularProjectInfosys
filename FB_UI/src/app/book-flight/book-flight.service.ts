import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flights } from '../shared/Flight';

@Injectable()
export class BookFlightService {
  flightDetail!: any;
  error!: any;
  errorMessage!: String;
  url!:string;
  constructor(private http: HttpClient) { }

  bookFlight(data: any): Observable<any> {
    //Consume the exposed URI's specified in QP
    return this.http.post<any>("http://localhost:1020/bookings",data);
  }

  getAllFlights(): Observable<Flights[]> {
    //Consume the exposed URI's specified in QP
    return this.http.get<Flights[]>("http://localhost:1020/flights");
  }

  updateFlight(flightId: any, data: any): Observable<any> {
    //Consume the exposed URI's specified in QP
    return this.http.patch("http://localhost:1020/flights/" + flightId,data);
  }
}
