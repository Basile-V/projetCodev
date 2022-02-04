import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MapComponent } from './component/map/map.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { QualiteAirComponent } from './component/qualite-air/qualite-air.component';
import { MonVehiculeComponent } from './component/mon-vehicule/mon-vehicule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChoixVehiculeComponent } from './component/choix-vehicule/choix-vehicule.component';
import { StationsComponent } from './component/stations/stations.component';
import {CommonModule} from "@angular/common";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ConnexionService} from "./services/connexion.service";
import { NoteComponent } from './component/note/note.component';

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
    NoteComponent,
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
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ConnexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
