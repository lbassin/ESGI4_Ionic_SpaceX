import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ILaunch } from '../../app/models/ILaunch';
import { GeneralPage } from './general/general';

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html',
})
export class MissionPage {

  launch: ILaunch;
  general: any;

  constructor(private navParams: NavParams) {
    this.launch = navParams.get('launch');
    this.general = GeneralPage;
  }
}
