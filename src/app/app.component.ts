import { Component, OnInit, NgZone } from '@angular/core';
import { ComponentFactory, IComponent, State, AnimatorTransition } from 'outkit';
import { DirectionsService } from './common/directions.service';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';
    directionsDialog: IComponent;
    mapComponent: IComponent;
    overlay: IComponent;
    directionsRenderer: google.maps.DirectionsRenderer;
    directionsStart: string;
    directionsEnd: string;
    map: google.maps.Map;
    inProgress: boolean;

    constructor(
        private directionsService: DirectionsService,
        private zone: NgZone
    ) {
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        const mapPanelData = document.getElementById('directions-data');
        this.directionsRenderer.setPanel(mapPanelData);

        this.directionsService.directionsRoute$.subscribe(result => {
            this.directionsDialog.relay('open').then(() => {
                return this.mapComponent.relay('open');
            }).then(() => {
                const mapProp = {
                    center: new google.maps.LatLng(40.7128, 74.0059),
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(document.getElementById('map'), mapProp);
                this.directionsRenderer.setMap(this.map);
                const mapPanelScroller = document.getElementById('directions-list-wrapper');
                mapPanelScroller.style.height = (document.body.offsetHeight - 156) + 'px';
                this.directionsRenderer.setDirections(result);
                this.directionsService.isSearching$.next(false);
            });
        });
        this.directionsService.isSearching$.subscribe(result => {
            this.zone.run(() => {
                this.inProgress = result;
            });
        });

        window.addEventListener('resize', () => {
            const mapPanelScroller = document.getElementById('directions-list-wrapper');
            const directionsDialog = document.getElementById('directions-dialog');
            directionsDialog.style.height = document.body.offsetHeight + 'px';
            mapPanelScroller.style.height = (document.body.offsetHeight - 156) + 'px';
        });
    }

    ngOnInit(): void {
        const ok = new ComponentFactory();
        this.directionsDialog = ok.component('#directions-dialog');
        this.mapComponent = ok.component('#map');
        this.overlay = ok.component('#overlay');
        this.directionsDialog.addChild(this.overlay);
        this.overlay.registerEvent('init', () => this.overlayInit());
        this.overlay.registerEvent('open', () => this.overlayOpen());
        this.directionsDialog.registerEvent('init', () => this.ddInit());
        this.directionsDialog.registerEvent('on', () => this.ddOn());
        this.directionsDialog.registerEvent('open', () => this.ddOpen());
        this.mapComponent.registerEvent('init', () => this.mapInit());
        this.mapComponent.registerEvent('open', () => this.mapOpen());

        this.directionsDialog.getAnimator()
            .setDuration(300)
            .setTransition(AnimatorTransition.EaseIn);
        this.directionsDialog.relay('init')
            .then(state => {
                this.directionsDialog.relay('on');
            });
        this.generateMap();
    }

    generateMap() {
        if (!this.map) {
            this.directionsRenderer = new google.maps.DirectionsRenderer();
            const mapProp = {
                center: new google.maps.LatLng(40.7128, 74.0059),
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(document.getElementById('map'), mapProp);
            this.directionsRenderer.setMap(this.map);
            this.directionsRenderer.setPanel(document.getElementById('directions-data'));
        }
        this.getLocation();
    }

    setLocation(position) {
        if (this.map) {
            this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
        }
    }

    ddInit() {
        const state = new State();
        const width = 400;
        const height = 100;
        state.style = {
            width: `${width}px`,
            height: `${height}px`,
            position: 'absolute',
            top: '50px',
            left: '50px',
            opacity: '0'
        };
        return this.directionsDialog.render(state);
    }

    ddOn() {
        const state = new State();
        const width = 500;
        const height = 150;
        state.style = {
            width: `${width}px`,
            height: `${height}px`,
            position: 'absolute',
            top: '50px',
            left: '50px',
            opacity: '1'
        };
        return this.directionsDialog.render(state);
    }

    ddOpen() {
        const state = new State();
        const width = 500;
        state.style = {
            width: `${width}px`,
            height: this.directionsDialog.getElement().parentElement.offsetHeight + 'px',
            position: 'absolute',
            left: '0',
            top: '0',
            opacity: '1',
        };
        state.stateClassName = 'open';
        return this.directionsDialog.render(state);
    }

    mapInit() {
        const state = new State();
        state.style = {
            marginLeft: '0px'
        };
        return this.mapComponent.render(state);
    }

    mapOpen() {
        const state = new State();
        state.style = {
            marginLeft: '500px'
        };
        state.stateClassName = 'open';
        return this.mapComponent.render(state);
    }

    overlayInit() {
        const state = new State();
        state.style.display = 'block';
        state.style.opacity = '.5';
        return this.overlay.render(state);
    }

    overlayOpen() {
        const state = new State();
        state.style.opacity = '0';
        return this.overlay.render(state)
            .then(() => {
                return this.overlayOff();
            });
    }

    overlayOff() {
        const state = new State();
        state.style.display = 'none';
        return this.overlay.render(state);
    }
}
