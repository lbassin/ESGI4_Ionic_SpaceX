import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpacexApiProvider} from "../../../providers/spacex-api/spacex-api";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the InfosSpaceXPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infos-space-x',
  templateUrl: 'infos-space-x.html',
})
export class InfosSpaceXPage {

  public companyInfo : ICompanyInfos;
  private GMapAPIUrl = "https://maps.googleapis.com/maps/api/";
  private wikipediaAPIV1Url = "https://en.wikipedia.org/api/rest_v1/page/media/";
  private geocodeAPIUrl = this.GMapAPIUrl + "geocode/json";
  private apiKey = "AIzaSyAXmTZR6BGKCYvV75pM77l1QaVEtpOdE1o";
  public lat = 0;
  public lng = 0;
  public mapType = "satellite";
  public mapZoom = 16;
  public mapCenter = {lat: this.lat, lng: this.lng};
  public medias = {};
  public mediasPositions : Array<string> = ['ceo','coo','cto','cto_propulsion'];
  public positions = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider, private http: HttpClient) {
    spacexApi.getCompanyInfos().subscribe(data => {
      this.companyInfo = data;
      /**
       * Récupération géolocalisation + affichage GMap via infos headquarters
       */

      let headquarters = this.companyInfo.headquarters;
      let town = headquarters.address+", "+headquarters.city+", "+headquarters.state;
      town = town.split(" ").join("+");
      let url = this.geocodeAPIUrl +"?address="+ town + "&key="+this.apiKey;
      this.http.get<IGMap>(url).subscribe((gmapResult) =>{
        let location = gmapResult.results[0].geometry.location;
        this.lat = location.lat;
        this.lng = location.lng;
        this.mapCenter = {lat: this.lat, lng: this.lng};
      });


      /**
       * Récupération photo CEO / CTO [...] via api wikipedia
       */
      this.mediasPositions.forEach((position) => {
          if(this.companyInfo[position].indexOf("Mueller") == -1){
            let ceoWikipediaUrl = this.wikipediaAPIV1Url + this.companyInfo[position].split(" ").join("_");

            this.http.get(ceoWikipediaUrl).subscribe((data:any) =>{
              if(!this.medias[this.companyInfo[position]]) {
                this.medias[this.companyInfo[position]] = data.items[0].original.source;
                this.positions.push(position);
              }
            });
          }else{
            this.medias[this.companyInfo[position]] = false;
            this.positions.push(position);
          }
      });

    });
  }


}
