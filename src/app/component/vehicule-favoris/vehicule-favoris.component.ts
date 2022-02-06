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

  vehicule: Vehicule[];

  constructor(private unVS: VehiculeService, private router: Router) { }

  ngOnInit(): void {
    this.unVS.getMesVehicules(localStorage.getItem('codeUser'),localStorage.getItem('idUser')).subscribe(
      reponse => {
        //Pour chaque vehicule, les insérer dans la table véhicule puis afficher dans la liste a puce du HTML
      }
    );
    console.log(this.vehicule); //Undefined
  }

}
