import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpacexApiProvider } from '../../providers/spacex-api/spacex-api';

/**
 * Generated class for the MissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html',
})
export class MissionPage {

  launch: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {
    spacexApi.getAllLaunches({
      flight_number: 1
    }).subscribe(data => {
        this.launch = data [0];
        console.log(data);
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionPage');
  }

}
