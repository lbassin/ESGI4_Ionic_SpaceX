import { Component } from '@angular/core';
import { App, IonicPage, NavParams } from 'ionic-angular';
import { DataService } from "../../../providers/data.service";
import { ICompanyHistory } from "../../../app/models/ICompany";
import { InfosHistoryDetailsPage } from "./infos-history-details/infos-history-details";

/**
 * Generated class for the InfosHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-history',
  templateUrl: 'info-history.html',
})
export class InfosHistoryPage {
  public datas = [];
  public state = {rendered: false};

  constructor(public navParams: NavParams, private dataservice: DataService, private app: App) {

    this.dataservice.getCompanyHistory().subscribe((data) => {
      data.forEach(history => {
        let historyDate = new Date(history.event_date_utc).getFullYear();
        let index;
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].year == historyDate) {
            index = i;
          }
        }
        if (index) {
          this.datas[index].data.push(history);
        } else {
          this.datas.push({year: historyDate, data: [history]});
        }
      });

      for (let i = this.datas.length - 1; i >= 0; i--) {
        for (let j = this.datas.length - 1; j > 0; j--) {
          if (this.datas[j].year > this.datas[j - 1].year) {
            let temp = this.datas[j - 1];
            this.datas[j - 1] = this.datas[j];
            this.datas[j] = temp;
          }
        }
      }

      this.state.rendered = true;
    });
  }

  showDetails(data: ICompanyHistory) {

    this.app.getRootNav().push(InfosHistoryDetailsPage, {
      history: data
    });
  }

}
