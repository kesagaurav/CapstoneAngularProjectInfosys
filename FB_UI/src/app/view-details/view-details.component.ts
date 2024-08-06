import { Component, OnInit } from '@angular/core';
import { FlightBooking } from '../shared/FlightBooking';
import { ViewDetailsService } from "./view-details.service";

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
  providers: [ViewDetailsService]
})
export class ViewDetailsComponent implements OnInit {
  flightDetails!: FlightBooking[];
  successMessage!: string;
  errorMessage!: string;
  constructor(private viewService: ViewDetailsService) { }

  ngOnInit() {
    this.view();

  }

  view() {
    this.viewService.view().subscribe(res=>{
      this.flightDetails=res;
    },
    error=>this.errorMessage="went wrong"
    );
  }

  delete(id: any) {
    this.viewService.delete(id).subscribe(
      success=>this.successMessage=`id is deleted successfully`,
      error=>this.errorMessage=`id is not deleted successfully`
    )
  }
}
