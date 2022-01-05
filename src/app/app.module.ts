import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { QualiteAirComponent } from './qualite-air/qualite-air.component';
import { MonVehiculeComponent } from './mon-vehicule/mon-vehicule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChoixVehiculeComponent } from './choix-vehicule/choix-vehicule.component';
import { StationsComponent } from './stations/stations.component';
import {CommonModule} from "@angular/common";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    ConnexionComponent,
    QualiteAirComponent,
    MonVehiculeComponent,
    ChoixVehiculeComponent,
    StationsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
