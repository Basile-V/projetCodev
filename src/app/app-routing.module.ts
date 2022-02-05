import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from "./component/connexion/connexion.component";
import {MonVehiculeComponent} from "./component/mon-vehicule/mon-vehicule.component";
import {MapComponent} from "./component/map/map.component";
import {ChoixVehiculeComponent} from "./component/choix-vehicule/choix-vehicule.component";
import {QualiteAirComponent} from "./component/qualite-air/qualite-air.component";
import {StationsComponent} from "./component/stations/stations.component";
import {HeaderComponent} from "./component/header/header.component";
import {NoteComponent} from "./component/note/note.component";


const routes : Routes =  [

  { path: '', redirectTo : '/header', pathMatch: 'full'  },
  { path: 'header', component: HeaderComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'monVehicule', component: MonVehiculeComponent },
  { path: 'map', component: MapComponent},
  { path: 'choixVehicule', component: ChoixVehiculeComponent },
  { path: 'qualiteAir', component: QualiteAirComponent },
  { path: 'stations', component: StationsComponent},
  { path: 'note', component: NoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
