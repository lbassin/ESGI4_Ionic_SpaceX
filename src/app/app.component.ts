import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CacheService } from '../providers/cache.service';
import { SearchService } from '../providers/search.service';
import { Subscription } from 'rxjs/Subscription';
import { ISearchResult } from './models/ISearchResult';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  private searchSubscription: Subscription;
  searchResult: ISearchResult;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private cacheService: CacheService,
              private searchService: SearchService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.initCache();
      this.initSearch();
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  updateSearchResults(event: any): void {
    this.searchService.updateResults(event.target.value);
  }
}
