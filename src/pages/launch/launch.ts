import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ILaunch } from '../../app/models/ILaunch';
import { GeneralPage } from './general/general';
import { DataService } from '../../providers/data.service';
import { RocketPage } from '../rocket/rocket';
import { IRocket } from '../../app/models/IRocket';
import { ICapsule } from '../../app/models/ICapsule';
import { CapsulePage } from '../capsule/capsule';
import { LocalNotifications } from '@ionic-native/local-notifications';

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

  hasCapsule: boolean;

  constructor(
    private navParams: NavParams,
    private dataService: DataService,
    private localNotifications: LocalNotifications) {
    this.launch = this.navParams.get('data');

    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
    });

    this.initCapsule();
    this.initRocket();

    this.generalPage = GeneralPage;
    this.rocketPage = RocketPage;
    this.capsulePage = CapsulePage;
  }

  private initRocket(): void {
    this.dataService.getRocketById(this.launch.rocket.rocket_id).subscribe((rocket: IRocket) => {
      this.rocket = rocket;
    });
  }

  private initCapsule(): void {
    const capsuleSerial = this.launch.rocket.second_stage.payloads[0].cap_serial;
    this.hasCapsule = !!capsuleSerial;

    if (!this.hasCapsule) {
      return;
    }

    this.dataService.getCapsuleBySerial(capsuleSerial).subscribe((capsule: ICapsule) => {
      this.capsule = capsule;
    });
  }
}
