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
    public nextLaunchIsLive: boolean = false;

    public upcomingLaunches: ILaunch[] = [];
    public pastLaunches: ILaunch[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private spacexApi: SpacexApiProvider) {

        spacexApi.getAllLaunches().subscribe(data => {
            let reverseData = data.reverse();

            // preview of a live launch
            this.fakeLiveLaunch(reverseData);

            reverseData.forEach(element => {
                let elementDate = new Date(element.launch_date_utc);
                element.launch_date_formated = elementDate.getDate()
                                                + ' ' + monthNames[elementDate.getMonth()]
                                                + ' ' + elementDate.getFullYear()
                                                + ' ~ ' + ('0' + elementDate.getHours()).slice(-2)
                                                + ':' + ('0' + elementDate.getMinutes()).slice(-2)
                                                + ':' + ('0' + elementDate.getSeconds()).slice(-2)
                                                + ' (UTC+2)';

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

        if (this.nextLaunchDays && this.nextLaunchHours && this.nextLaunchMinutes && this.nextLaunchSeconds <= 0) {
            this.nextLaunchIsLive = true;
        }
    }

    private fakeLiveLaunch(data) {
        let newData = {};

        let fakeLaunchDate = new Date();
        fakeLaunchDate.setSeconds(fakeLaunchDate.getSeconds() + 10);

        newData['details'] = 'Nasa sucks';
        newData['flight_number'] = '999';
        newData['launch_date_formated'] = "undefined";
        newData['launch_date_local'] = "undefined";
        newData['launch_date_unix'] = "undefined";
        newData['launch_date_utc'] = fakeLaunchDate.toString();
        newData['launch_site'] = {
            'site_id': 'paris',
            'site_name': 'Paris',
            'site_name_long': 'Paris'
        };
        newData['launch_success'] = 'false';
        newData['launch_year'] = (new Date()).getFullYear().toString();
        newData['links'] = {
            'article_link': null,
            'mission_patch': null,
            'mission_patch_small': "https://i.imgur.com/AZOQ5ZS.png",
            'presskit': null,
            'reddit_campaign': null,
            'reddit_launch': null,
            'reddit_media': null,
            'reddit_recovery': null,
            'video_link': null,
            'wikipedia': null
        };
        newData['mission_name'] = "Elon loves space";
        newData['reuse'] = {
            'capsule': false,
            'core': true,
            'fairings': false,
            'side_core1': false,
            'side_core2': false
        };
        newData['rocket'] = {
            'first_stage': {
                'core': [{
                    'block': null,
                    'core_serial': null,
                    'flight': null,
                    'land_success': null,
                    'landing_type': null,
                    'landing_vehicle': null,
                    'reused': null
                }]
            },
            'rocket_id': 'falcon9',
            'rocket_name': 'Falcon 9',
            'rocket_type': 'FT',
            'second_stage': {
                'payloads': [{
                    'customers': ['SES'],
                    'orbit': 'GTO',
                    'payload_id': 'SES-12',
                    'payload_mass_kg': 5300,
                    'payload_mass_lbs': null,
                    'reused': false,
                }]
            },
        };
        newData['telemetry'] = {
            'flight_club': null
        };

        data.push(newData);
    }
}