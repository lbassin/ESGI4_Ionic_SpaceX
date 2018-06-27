import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataService} from "../../../../../providers/data.service";

/**
 * Generated class for the LaunchChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launch-chart',
  templateUrl: 'launch-chart.html',
})
export class LaunchChartPage {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public title: string;

  public barChartData:any[] = [

  ];
  public launchesByYear = {
    data : []
  };
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataservice : DataService) {
    this.title = this.navParams.get('title');
    this.dataservice.getAllLaunches().subscribe(data => {
      let chartData = {data : [], labels: "launches"};
      data.forEach( launch => {
        if(this.barChartLabels.indexOf(launch.launch_year) == -1){
          this.barChartLabels.push(launch.launch_year);
        }

        if(!chartData.data[this.barChartLabels.indexOf(launch.launch_year)]){
          chartData.data[this.barChartLabels.indexOf(launch.launch_year)] = 0;
        }
        chartData.data[this.barChartLabels.indexOf(launch.launch_year)] = chartData.data[this.barChartLabels.indexOf(launch.launch_year)] + 1;

        if(!this.launchesByYear.data[launch.launch_year]) {
          this.launchesByYear.data[launch.launch_year] = [];
        }
        this.launchesByYear.data[launch.launch_year].push(launch);
      });
      this.barChartData.push(chartData);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LaunchChartPage');
  }

}
