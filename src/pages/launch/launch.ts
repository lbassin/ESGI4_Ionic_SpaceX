import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ILaunch } from '../../app/models/ILaunch';
import { GeneralPage } from './general/general';
import { DataService } from '../../providers/data.service';
import { RocketPage } from '../rocket/rocket';
import { IRocket } from '../../app/models/IRocket';

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'launch.html',
})
export class LaunchPage {

  generalPage: any;
  rocketPage: any;

  launch: ILaunch;
  rocket: IRocket;

  constructor(private navParams: NavParams, private dataService: DataService) {
    this.launch = this.navParams.get('data');

    this.dataService.getRocketById(this.launch.rocket.rocket_id).subscribe((rocket: IRocket) => {
      this.rocket = rocket;
    });

    this.generalPage = GeneralPage;
    this.rocketPage = RocketPage;
  }
}
