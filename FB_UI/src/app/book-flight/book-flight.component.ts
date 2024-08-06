import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Flights } from '../shared/Flight';
import { FlightBooking } from '../shared/FlightBooking';
import { BookFlightService } from "./book-flight.service";

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
  providers: [BookFlightService]
})
export class BookFlightComponent implements OnInit {

  errorMessage!: string;
  successMessage!: string;
  flights!: Flights[];
  bookingForm!: FormGroup;
  flightBooking!:FlightBooking;

  constructor(private fb: FormBuilder, private bookFlightService: BookFlightService) { }

  ngOnInit() {
    //Create the bookingForm FormGroup and get all the flight details
    this.bookingForm=this.fb.group({
      passengerName:['',[Validators.required]],
      noOfTickets:['',[Validators.required,Validators.min(1)]],
      flightId:['',[Validators.required,this.validateFlight]]
    })
    this.bookFlightService.getAllFlights().subscribe(res=>{
      this.flights=res;
    })
  }
  book() {
    // Code the method here
    const selectedFlightId=this.flightBooking.flightId;
    const selectedFlight=this.flights.find(a=>a.id===selectedFlightId);
    if(!selectedFlight){
      this.errorMessage=`selected flight not found`;
    }
    if(selectedFlight?.status==='yes'){

        this.errorMessage=`Flight Cancelled`;

    }
    if(selectedFlight?.availableSeats<this.flightBooking.noOfTickets){
      this.errorMessage=`Requested no of seats is unavailable`;

    }
    const totalFare=this.bookingForm.value.fare*this.flightBooking.noOfTickets;
    this.bookFlightService.bookFlight(this.bookingForm.value).subscribe(
      success=>this.successMessage=success.message,
      error=>this.errorMessage=error.error.message
    )
    this.bookFlightService.updateFlight(selectedFlight,{
      availableSeats:selectedFlight?.availableSeats-this.flightBooking.noOfTickets
    }).subscribe(
      success=>this.successMessage=`flight is updated successfully`

    )
  }

 validateFlight(c: FormControl) {
  /*
     Code the validator here
     Use flightError as the property
 */
    const test=/^[a-zA-Z]{3}-[0-9]{3}$/;
    return test.test(c.value) ? null :{
      flightError:{
        message:'invalid flight'
      }
    }

}
}

