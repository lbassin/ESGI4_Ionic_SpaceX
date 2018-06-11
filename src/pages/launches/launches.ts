import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api.service';
import { ILaunch } from '../../app/models/ILaunch';

@IonicPage()
@Component({
  selector: 'page-launches',
  templateUrl: 'launches.html',
})
export class LaunchesPage {

    public nextLaunch: ILaunch;
    public launches: ILaunch[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: ApiService) {

        spacexApi.getAllLaunches().subscribe(data => {
            this.nextLaunch = data[0];
            this.launches = data;
        });
    }
}
