import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RequeteHTTPService} from '../../services/requete-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() childToParent = new EventEmitter<Array<any>>();
  closestStations = [];
  postcode = "";
  connected: boolean;
  connexion: string;


  constructor(private service: RequeteHTTPService) { }

  ngOnInit() {
//    this.connected = window.localStorage.getItem('code').length > 0;
//    this.connected ? this.connexion = "/header" : this.connexion = "/deconnexion";
  }

  deconnexion(): void {
    window.localStorage.removeItem('code');
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
