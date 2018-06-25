import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ILaunch } from '../../../app/models/ILaunch';

@Component({
  templateUrl: 'general.html',
})
export class GeneralPage {

  launch: ILaunch;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.launch = navParams.data
  }
}
