import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LaunchesPage } from '../pages/launches/launches';
import { LaunchPage } from '../pages/launch/launch';
import { CacheService } from '../providers/cache.service';
import { SearchService } from '../providers/search.service';
import { ISearchResult } from './models/ISearchResult';

import { InfosPage } from "../pages/infos/infos";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DataService } from '../providers/data.service';
import { ILaunch } from './models/ILaunch';
import { IFilter } from './models/IFilter';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LaunchesPage;

  pages: Array<{ title: string, component: any }>;

  searchResult: ISearchResult;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private cacheService: CacheService,
              private searchService: SearchService,
              private localNotifications: LocalNotifications,
              private dataService: DataService) {
    this.initializeApp();
    this.initSearch();
    this.initCache();
    this.initNotifications();

    this.pages = [
      {title: 'Launches', component: LaunchesPage},
      {title: 'Mission', component: LaunchPage},
      {title: 'Infos', component: InfosPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initCache(): void {
    this.cacheService.generateAll();
  }

  initSearch(): void {
    this.searchResult = {} as ISearchResult;
    this.searchService.getObservable().subscribe((searchResult: ISearchResult) => {
      this.searchResult = searchResult
    });

    this.searchService.updateResults(null);
  }

  openPage(element) {
    this.nav.push(element.page, {data: element.data});
  }

  updateSearchResults(event: any): void {
    this.searchService.updateResults(event.target.value);
  }

  initNotifications(): void {
    this.dataService.getUpcomingLaunches({} as IFilter).subscribe((launches: ILaunch[]) => {
        launches.forEach((launch: ILaunch) => {
          this.localNotifications.schedule({
            text: 'Upcoming SpaceX launch',
            trigger: {at: new Date(new Date().getTime() + 3600)},
          });
        });
      }
    );
  }
}
