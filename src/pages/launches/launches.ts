import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { ILaunch } from '../../app/models/ILaunch';
import { DataService } from '../../providers/data.service';
import { LaunchPage } from '../launch/launch';
import { InfosPage } from "../infos/infos";
import { FiltersPage } from './filters/filters';
import { ISubscription } from 'rxjs/Subscription';
import { IFilter } from '../../app/models/IFilter';

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

  private orderFilter: string;
  private yearFilter: number;

  private upcomingSubscription: ISubscription;
  private pastSubscription: ISubscription;

  constructor(private navCtrl: NavController, private dataService: DataService, private popoverCtrl: PopoverController) {

    this.dataService.getNextLaunch().subscribe((data: ILaunch) => {
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

    this.updateLaunches();
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

  goToInfos() {
    this.navCtrl.push(InfosPage);
  }

  presentPopover(event) {
    const filters = this.getFiltersData();
    let popover = this.popoverCtrl.create(FiltersPage, filters);

    popover.present({
      ev: event
    });

    popover.onDidDismiss((data: { order: string, year: number }) => {
      this.orderFilter = undefined;
      this.yearFilter = undefined;

      if (data) {
        this.orderFilter = data.order;
        this.yearFilter = data.year;
      }

      this.updateLaunches();
    })
  }

  updateLaunches() {
    if (this.upcomingSubscription) {
      this.upcomingSubscription.unsubscribe();
    }

    if (this.pastSubscription) {
      this.pastSubscription.unsubscribe();
    }

    const filters = this.getFiltersData();

    this.upcomingSubscription = this.dataService.getUpcomingLaunches(filters).subscribe((data: ILaunch[]) => {
      data.shift();
      this.upcomingLaunches = data;
    });

    this.pastSubscription = this.dataService.getPastLaunches(filters).subscribe((data: ILaunch[]) => {
      this.pastLaunches = data.reverse();
      this.endLoadingData = true;
    });
  }

  private getFiltersData(): IFilter {
    let filters = {} as IFilter;

    if (this.yearFilter) {
      filters['year'] = this.yearFilter;
    }

    if (this.orderFilter) {
      filters['order'] = this.orderFilter;
    }

    return filters;
  }
}
