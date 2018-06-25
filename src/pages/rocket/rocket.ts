import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { IRocket } from '../../app/models/IRocket';

/**
 * Generated class for the RocketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rocket',
  templateUrl: 'rocket.html',
})
export class RocketPage {

  rocket: IRocket;

  constructor(private navParams: NavParams) {
    this.rocket = this.navParams.get('data');
  }

}
