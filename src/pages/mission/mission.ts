import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ILaunch } from '../../app/models/ILaunch';
import { GeneralPage } from './general/general';
import { RocketPage } from './rocket/rocket';

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html',
})
export class MissionPage {

  launch: ILaunch;
  general: any;
  rocket: any;

  constructor(private navParams: NavParams) {
    this.launch = navParams.get('launch');
    this.general = GeneralPage;
    this.rocket = RocketPage;
  }
}
