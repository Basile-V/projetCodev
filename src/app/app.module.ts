import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MapComponent } from './component/map/map.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { MonVehiculeComponent } from './component/mon-vehicule/mon-vehicule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ConnexionService} from "./services/connexion.service";
import { NoteComponent } from './component/note/note.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ErreurVehiculeComponent } from './component/mesErreurs/erreurVehicule/erreur-vehicule/erreur-vehicule.component';
import { VehiculeFavorisComponent } from './component/vehicule-favoris/vehicule-favoris.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOption, MatOptionModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import { ProfilComponent } from './component/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    ConnexionComponent,
    MonVehiculeComponent,
    NoteComponent,
    ErreurVehiculeComponent,
    VehiculeFavorisComponent,
    ProfilComponent,
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
      MatInputModule,
      MatCheckboxModule,
      MatSelectModule,
      MatOptionModule,
      MatSliderModule
    ],
  providers: [ConnexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
