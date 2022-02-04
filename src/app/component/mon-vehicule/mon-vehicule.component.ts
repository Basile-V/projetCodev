import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConnexionService} from "../../services/connexion.service";
import {Router} from "@angular/router";
import {VehiculeService} from "../../services/vehicule.service";

@Component({
  selector: 'app-mon-vehicule',
  templateUrl: './mon-vehicule.component.html',
  styleUrls: ['./mon-vehicule.component.css']
})
export class MonVehiculeComponent implements OnInit {

  containerStyle: any;
  choixVehiculeForm: FormGroup;
  vehicule: string;

  constructor(private unVS: VehiculeService, private router: Router) { }

  marqueControl: FormControl = new FormControl('', Validators.required);
  modelControl: FormControl = new FormControl('', Validators.required);
  carbuControl: FormControl = new FormControl('', Validators.required);
  anneeControl: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.containerStyle = 'container';
    this.choixVehiculeForm = new FormGroup({
      marque: this.marqueControl,
      model: this.modelControl,
      carbu: this.carbuControl,
      annee: this.anneeControl,
    });
  }

  chercherVehicule(): void{
    this.vehicule = this.marqueControl.value + '+' + this.modelControl.value + '+' + this.carbuControl.value + '+' +
      this.anneeControl.value;
    this.unVS.chercherVehicule(this.vehicule).subscribe(
      reponse=>{
        console.log('Recherche en cours...');
        localStorage.setItem('ListeVehicule', JSON.stringify(reponse));
        this.router.navigate(['/choixVehicule'])
      },
      err => {
        alert('Erreur dans votre saise, vérifier les champs.');
        console.log(err);
      }
    );
  }
}
