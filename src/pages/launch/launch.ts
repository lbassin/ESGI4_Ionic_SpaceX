import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ILaunch } from '../../app/models/ILaunch';
import { GeneralPage } from './general/general';
import { DataService } from '../../providers/data.service';
import { RocketPage } from '../rocket/rocket';
import { IRocket } from '../../app/models/IRocket';
import { CapsulePage } from '../capsule/capsule';
import { ICapsule } from '../../app/models/ICapsule';

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'launch.html',
})
export class LaunchPage {

  generalPage: any;
  rocketPage: any;
  capsulePage: any;

  launch: ILaunch;
  rocket: IRocket;
  capsule: ICapsule;

  constructor(private navParams: NavParams, private dataService: DataService) {
    this.launch = this.navParams.get('data');

    console.log(this.launch);

    this.dataService.getRocketById(this.launch.rocket.rocket_id).subscribe((rocket: IRocket) => {
      this.rocket = rocket;
    });

    // TODO chercher le capsule_id
    /*this.dataService.getCapsuleById(this.launch.capsule.capsule_id).subscribe((capsule: ICapsule) => {
      this.capsule = capsule;
    });*/

    this.generalPage = GeneralPage;
    this.rocketPage = RocketPage;
    this.capsulePage = CapsulePage;
  }
}
