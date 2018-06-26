import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LaunchChartPage} from "./charts/launch-chart/launch-chart";
import {SafChartPage} from "./charts/saf-chart/saf-chart";

/**
 * Generated class for the InfosChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infos-charts',
  templateUrl: 'infos-charts.html',
})
export class InfosChartsPage {

  public datas = [
    {
      icon : 'main-icon/rocket.svg',
      name: 'launches',
      title: 'Launches by years',
      page:  LaunchChartPage
    },
    {
      icon : 'main-icon/rocket.svg',
      name: 'saf',
      title: 'Success and Fail',
      page:  SafChartPage
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {
  }

  moveToCharts(value:string) {

    this.datas.forEach( data => {
      if (value === data.name) {
        this.app.getRootNav().push(data.page);
      }
    });
  }
}
