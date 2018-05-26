import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

const counter = Observable.interval(1000);
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

    public countdown: number;
    public currentTimestamp = Math.round(+new Date()/1000);

    constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: ApiService) {

        spacexApi.getAllLaunches().subscribe(data => {
            this.nextLaunch = data[0];
            this.launches = data.reverse();

            counter.subscribe(() => {
                this.countdown = Math.round(+new Date()/1000) - this.nextLaunch.launch_date_unix;
            });
        });
    }

    ionViewDidLoad() { }
}
