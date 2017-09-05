import { Component, OnInit } from '@angular/core';
import { DirectionsService } from '../common/directions.service';

@Component({
    selector: 'directions-form',
    templateUrl: 'directions-form.component.html',
    styleUrls: ['directions-form.component.scss']
})

export class DirectionsFormComponent implements OnInit {

    start: string;
    end: string;
    travelMode: google.maps.TravelMode;

    constructor(
        private directionsService: DirectionsService
    ) { }

    onSubmit() {
        if (this.start && this.end) {
            this.directionsService.setDirectionsRequest(this.start, this.end, this.travelMode);
            this.directionsService.setDirectionsRoute();
        }
    }

    ngOnInit() { }
}
