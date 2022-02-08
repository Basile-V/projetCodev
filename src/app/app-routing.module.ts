import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from "./component/connexion/connexion.component";
import {MonVehiculeComponent} from "./component/mon-vehicule/mon-vehicule.component";
import {MapComponent} from "./component/map/map.component";
import {NoteComponent} from "./component/note/note.component";
import {ErreurVehiculeComponent} from "./component/mesErreurs/erreurVehicule/erreur-vehicule/erreur-vehicule.component";
import {VehiculeFavorisComponent} from "./component/vehicule-favoris/vehicule-favoris.component";
import {ProfilComponent} from "./component/profil/profil.component";


const routes : Routes =  [

  { path: '', redirectTo : '/connexion', pathMatch: 'full'  },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'monVehicule', component: MonVehiculeComponent },
  { path: 'map', component: MapComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'note', component: NoteComponent},
  { path: 'erreurVehicule', component: ErreurVehiculeComponent},
  { path: 'vehiculeFavoris', component: VehiculeFavorisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
