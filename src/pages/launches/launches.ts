import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ILaunch } from '../../app/models/ILaunch';
import { DataService } from '../../providers/data.service';
import { LaunchPage } from '../launch/launch';

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

  constructor(private navCtrl: NavController, private dataService: DataService) {

    dataService.getNextLaunch().subscribe((data: ILaunch) => {
      this.nextLaunch = data;

      let countdown = new Date();
      let nextLaunchDate = new Date(this.nextLaunch.launch_date_utc);

      countdown.setMonth(countdown.getMonth() + (nextLaunchDate.getMonth() - countdown.getMonth()));
      countdown.setDate(countdown.getDate() + (nextLaunchDate.getDate() - countdown.getDate()));
      countdown.setHours(countdown.getHours() + (nextLaunchDate.getHours() - countdown.getHours()));
      countdown.setMinutes(countdown.getMinutes() + (nextLaunchDate.getMinutes() - countdown.getMinutes()));
      countdown.setSeconds(countdown.getSeconds() + (nextLaunchDate.getSeconds() - countdown.getSeconds()));

      this.amazingCountdownFunction(countdown);

      setInterval(() => {
        this.amazingCountdownFunction(countdown);
      }, 1000);
    });

    dataService.getUpcomingLaunches().subscribe((data: ILaunch[]) => {
      data.shift();
      this.upcomingLaunches = data;
    });

    dataService.getPastLaunches().subscribe((data: ILaunch[]) => {
      this.pastLaunches = data.reverse();
      this.endLoadingData = true;
    });
  }

  private amazingCountdownFunction(toDate: Date) {
    let now = new Date();
    let difference = toDate.getTime() - now.getTime();

    this.nextLaunchSeconds = Math.floor(difference / 1000);
    this.nextLaunchMinutes = Math.floor(this.nextLaunchSeconds / 60);
    this.nextLaunchHours = Math.floor(this.nextLaunchMinutes / 60);
    this.nextLaunchDays = Math.floor(this.nextLaunchHours / 24);

    this.nextLaunchHours %= 24;
    this.nextLaunchMinutes %= 60;
    this.nextLaunchSeconds %= 60;

    if (this.nextLaunchDays <= 0 &&
      this.nextLaunchHours <= 0 &&
      this.nextLaunchMinutes <= 0 &&
      this.nextLaunchSeconds <= 0) {
      this.nextLaunchIsLive = true;
    }
  }

  goToLaunch(launch: ILaunch) {
    this.navCtrl.push(LaunchPage, {
      data: launch
    });
  }
}
