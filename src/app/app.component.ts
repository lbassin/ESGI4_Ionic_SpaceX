import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LaunchesPage } from '../pages/launches/launches';
import { LaunchPage } from '../pages/launch/launch';
import { CacheService } from '../providers/cache.service';
import { SearchService } from '../providers/search.service';
import { Subscription } from 'rxjs/Subscription';
import { ISearchResult } from './models/ISearchResult';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LaunchesPage;

  pages: Array<{ title: string, component: any }>;

  private searchSubscription: Subscription;
  searchResult: ISearchResult;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private cacheService: CacheService,
              private searchService: SearchService) {
    this.initializeApp();
    this.initSearch();
    this.initCache();

    this.pages = [
      {title: 'Launches', component: LaunchesPage},
      {title: 'Mission', component: LaunchPage}
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
    this.searchSubscription = this.searchService.getObservable().subscribe((searchResult: ISearchResult) => {
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
}
