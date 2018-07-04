import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ILaunchpad } from '../../app/models/ILaunchpad';

@IonicPage()
@Component({
  selector: 'page-launchpad',
  templateUrl: 'launchpad.html',
})
export class LaunchpadPage {

  launchpad: ILaunchpad;

  constructor(private navParams: NavParams) {
    this.launchpad = this.navParams.get('data') ? this.navParams.get('data') : this.navParams.data;
  }

}
