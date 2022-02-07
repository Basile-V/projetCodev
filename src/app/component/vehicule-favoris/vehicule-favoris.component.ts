import { Component, OnInit } from '@angular/core';
import {Vehicule} from "../../models/vehicule";
import {Router} from "@angular/router";
import {VehiculeService} from "../../services/vehicule.service";

@Component({
  selector: 'app-vehicule-favoris',
  templateUrl: './vehicule-favoris.component.html',
  styleUrls: ['./vehicule-favoris.component.css']
})
export class VehiculeFavorisComponent implements OnInit {

  vehiculeTable: Array<any>;

  constructor(private unVS: VehiculeService, private router: Router) { }

  ngOnInit(): void {
    this.vehiculeTable = new Array();
    this.unVS.getMesVehicules(localStorage.getItem('codeUser'),localStorage.getItem('idUser')).subscribe(
      reponse => {
        for(let i=0;i<reponse.length;i++){
          let unVehicule = new Vehicule();
          unVehicule.marque=reponse[i]['marque'];
          unVehicule.modele=reponse[i]['modele'];
          unVehicule.marque=reponse[i]['carburant'];
          unVehicule.marque=reponse[i]['annee'];
          this.vehiculeTable.push(unVehicule);
        }
      }
    );
  }



}
