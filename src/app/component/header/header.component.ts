import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RequeteHTTPService} from '../../services/requete-http.service';
import {Router} from "@angular/router";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() childToParent = new EventEmitter<Array<any>>();
  closestStations = [];
  postcode = "";
  connectedCode: string | null;
  userId: string | null;


  constructor(private service: RequeteHTTPService, private utilisateur: UtilisateurService, private router: Router) { }

  ngOnInit() {
    this.connectedCode = localStorage.getItem('codeUser');
    this.userId = localStorage.getItem('idUser');
    if(this.connectedCode==null){
      this.router.navigate(['/connexion']);
    }
  }

  deconnexion(): void {
    localStorage.removeItem('codeUser');
    localStorage.removeItem('idUser');
    this.router.navigate(['/connexion']);
  }

  supprimerCompte(){
    let code = localStorage.getItem('codeUser');
    let id = localStorage.getItem('idUser');
    this.utilisateur.supprimerCompte(code,id).subscribe(
      reponse =>{
        alert("Suppression réussite");
      }
    );
    localStorage.removeItem('codeUser');
    localStorage.removeItem('idUser');
    this.router.navigate(['/connexion']);
  }

  getLocation(){
    this.service.getLocationService().then(resp=>{
      this.service.getStations(resp.lat, resp.lng).subscribe(stations => {
        this.closestStations = stations;
        this.sendToParent(this.closestStations);
      });
    })
  }

  async getPostcode() {
    if (this.postcode.length == 5) {
      (await this.service.getLatLong(this.postcode)).subscribe(data => {
        if(data.length > 0){
          this.service.getStations(data[0].latitude, data[0].longitude).subscribe(stations => {
            this.closestStations = stations;
            this.sendToParent(this.closestStations);
          });
        }
      });
    }
  }

  getClosestStation(){
    console.log(this.closestStations);
  }

  sendToParent(stations: any[] | undefined){
    this.childToParent.emit(stations);
  }
}
