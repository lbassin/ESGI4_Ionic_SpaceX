import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from "../../../../../providers/data.service";

/**
 * Generated class for the FirstStageChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-stage-chart',
  templateUrl: 'first-stage-chart.html',
})
export class FirstStageChartPage {

  public labels: string[] = ['reusable', 'not reusable'];
  public score: number[] = [0,0];
  public reusableList: any[] = [];
  public notReusableList: any[] = [];
  public chartType: string = "doughnut";
  public title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataservice: DataService) {
    this.title = navParams.get('title');
    this.dataservice.getAllRockets().subscribe(data => {
      data.forEach(rocket => {
        if(!rocket.first_stage.reusable){
          this.notReusableList.push(rocket);
          this.score[1]++;
          return;
        }

        this.reusableList.push(rocket);
        this.score[0]++;
      });
    });
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstStageChartPage');
  }

}
