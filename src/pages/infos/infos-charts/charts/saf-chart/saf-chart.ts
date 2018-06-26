import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataService} from "../../../../../providers/data.service";

/**
 * Generated class for the SafChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saf-chart',
  templateUrl: 'saf-chart.html',
})
export class SafChartPage {
  public labels: string[] = ['success', 'fails'];
  public score: number[] = [0,0];
  public successList = [];
  public failsList = [];
  public chartType: string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataservice: DataService) {
    this.dataservice.getAllLaunches().subscribe(data => {
      data.forEach( launch => {
        if(!launch.launch_success){
          this.failsList.push(launch);
          this.score[1]++;
          return;
        }
        this.successList.push(launch);
        this.score[0]++;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafChartPage');
  }

}
