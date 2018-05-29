import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpacexApiProvider } from './../../providers/spacex-api/spacex-api';
import { ILaunch } from './../../app/models/ILaunch';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@IonicPage()
@Component({
  selector: 'page-launches',
  templateUrl: 'launches.html',
})
export class LaunchesPage {

    public endLoadingData: boolean = false;

    public typeLaunches: string = "upcoming";

    public nextLaunch: ILaunch;
    public nextLaunchDays: number = 0;
    public nextLaunchHours: number = 0;
    public nextLaunchMinutes: number = 0;
    public nextLaunchSeconds: number = 0;

    public upcomingLaunches: ILaunch[] = [];
    public pastLaunches: ILaunch[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {

        spacexApi.getAllLaunches().subscribe(data => {
            let reverseData = data.reverse();

            reverseData.forEach(element => {
                let elementDate = new Date(element.launch_date_utc);
                element.launch_date_formated = elementDate.getDate() 
                                                + ' ' + monthNames[elementDate.getMonth()] 
                                                + ' ' + elementDate.getFullYear()
                                                + ' ~ ' + ('0' + elementDate.getHours()).slice(-2)
                                                + ':' + ('0' + elementDate.getMinutes()).slice(-2)
                                                + ':' + ('0' + elementDate.getSeconds()).slice(-2);

                if (element.launch_date_unix <= Math.round(+new Date() / 1000)) {
                    this.pastLaunches.push(element);
                } else {
                    if (element.links.mission_patch_small === null) {
                        element.links.mission_patch_small = "http://freedesignfile.com/upload/2017/08/rocket-icon-vector.png"
                    }
                    this.upcomingLaunches.push(element);
                }
            });

            this.upcomingLaunches.reverse();
            this.nextLaunch = this.upcomingLaunches[0];
            this.upcomingLaunches.shift();

            let countdown = new Date();
            let nextLaunchDate = new Date(this.nextLaunch.launch_date_utc);

            countdown.setMonth(countdown.getMonth() + (nextLaunchDate.getMonth() - countdown.getMonth()))
            countdown.setDate(countdown.getDate() + (nextLaunchDate.getDate() - countdown.getDate()));
            countdown.setHours(countdown.getHours() + (nextLaunchDate.getHours() - countdown.getHours()));
            countdown.setMinutes(countdown.getMinutes() + (nextLaunchDate.getMinutes() - countdown.getMinutes()));
            countdown.setSeconds(countdown.getSeconds() + (nextLaunchDate.getSeconds() - countdown.getSeconds()));

            this.amazingCountdownFunction(countdown);

            this.endLoadingData = true;

            setInterval(() => {
                this.amazingCountdownFunction(countdown);
            }, 1000);
        });
    }

    ionViewDidLoad() { }

    private amazingCountdownFunction(toDate) {
        let now = new Date();
        let difference = toDate.getTime() - now.getTime();

        this.nextLaunchSeconds = Math.floor(difference / 1000);
        this.nextLaunchMinutes = Math.floor(this.nextLaunchSeconds / 60);
        this.nextLaunchHours = Math.floor(this.nextLaunchMinutes / 60);
        this.nextLaunchDays = Math.floor(this.nextLaunchHours / 24);

        this.nextLaunchHours %= 24;
        this.nextLaunchMinutes %= 60;
        this.nextLaunchSeconds %= 60;
    }
}
