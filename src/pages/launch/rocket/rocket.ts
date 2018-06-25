import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ILaunch } from '../../../app/models/ILaunch';

@Component({
  templateUrl: 'rocket.html',
})
export class RocketPage {

  launch: ILaunch;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.launch = navParams.data
  }
}
