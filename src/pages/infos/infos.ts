import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InfosSpaceXPage} from "./infos-space-x/infos-space-x";
import {InfosChartsPage} from "./infos-charts/infos-charts";

/**
 * Generated class for the InfosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infos',
  templateUrl: 'infos.html',
})
export class InfosPage {
  spaceXTab = InfosSpaceXPage;
  chartTab = InfosChartsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
