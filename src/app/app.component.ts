import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LaunchesPage } from '../pages/launches/launches';
import { MissionPage } from '../pages/mission/mission';
import { CacheService } from '../providers/cache.service';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LaunchesPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public cacheService: CacheService) {
    this.initializeApp();

    this.pages = [
      {title: 'Launches', component: LaunchesPage},
      {title: 'Mission', component: MissionPage}
    ];

    this.cacheService.generateAll();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  updateSearchResults(event: any): void {
    console.log(event.target.value);
  }
}
