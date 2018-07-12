import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ICompanyHistory } from "../../../../app/models/ICompany";

/**
 * Generated class for the InfosHistoryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-history-details',
  templateUrl: 'infos-history-details.html',
})
export class InfosHistoryDetailsPage {
  public history : ICompanyHistory;

  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser) {
    this.history = this.navParams.get('history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfosHistoryDetailsPage');
  }

  goToUrl(url: string) {
    const browser = this.iab.create(url);
    browser.show();
  }
}
