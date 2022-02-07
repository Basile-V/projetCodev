import { Component, OnInit } from '@angular/core';
import {VehiculeService} from "../../services/vehicule.service";
import {Router} from "@angular/router";
import {Vehicule} from "../../models/vehicule";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  vehicule:Vehicule;
  marque: string;
  modele: string;
  carburant: string;
  annee: string;

  constructor(private unVS: VehiculeService, private router: Router) { }

  ngOnInit(): void {
    this.vehicule = new Vehicule();
    let marque = localStorage.getItem('marque');
    let modele = localStorage.getItem('modele');
    let carburant = localStorage.getItem('carburant');
    let annee = localStorage.getItem('annee');
    this.vehicule.marque=marque;
    this.vehicule.modele=modele;
    this.vehicule.carburant=carburant;
    this.vehicule.annee=annee;
  }

}
