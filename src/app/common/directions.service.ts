import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/bindCallback';

@Injectable()
export class DirectionsService {

    private start: string;
    private end: string;
    private directionsService: google.maps.DirectionsService;
    private request: google.maps.DirectionsRequest;
    public directionsRoute$: Subject<any>;
    public isSearching$: Subject<boolean>;

    constructor() {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRoute$ = new Subject();
        this.isSearching$ = new Subject();
        this.isSearching$.next(false);
    }

    setDirectionsRequest(start: string, end: string, travelMode: google.maps.TravelMode = google.maps.TravelMode.DRIVING) {
        this.request = {
            origin: start,
            destination: end,
            travelMode: travelMode
        };

    }

    setDirectionsRoute(): void {
        this.isSearching$.next(true);
        this.directionsService.route(this.request, (results, status) => {
            if (status !== google.maps.DirectionsStatus.OK) {
                throw { status, results };
            }
            this.directionsRoute$.next(results);
        });
    }

}
