import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { IRocket } from '../../app/models/IRocket';

@IonicPage()
@Component({
  selector: 'page-rocket',
  templateUrl: 'rocket.html',
})
export class RocketPage {

  rocket: IRocket;

  constructor(private navParams: NavParams) {
    this.rocket = this.navParams.get('data') ? this.navParams.get('data') : this.navParams.data;
  }

}
