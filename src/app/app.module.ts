import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdIconModule, MdProgressBarModule } from '@angular/material';

// Components
import { DirectionsFormComponent } from './forms/directions-form.component';

// Services
import { DirectionsService } from './common/directions.service';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        DirectionsFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        // Material Imports
        MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
        MdIconModule,
        MdProgressBarModule
    ],
    providers: [
        DirectionsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
