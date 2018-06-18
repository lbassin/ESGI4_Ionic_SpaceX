import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LaunchesPage } from './../pages/launches/launches';
import { MissionPage } from '../pages/mission/mission';

@Component({
  templateUrl: 'app.html',
  template: `
  <ion-tabs>
    <ion-tab [root]="tab1" tabTitle="General"></ion-tab>
    <ion-tab [root]="tab2" tabTitle="Rocket"></ion-tab>
    <ion-tab [root]="tab2" tabTitle="Capsule"></ion-tab>
  </ion-tabs>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  tab1: any;
  tab2: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public cacheService: CacheService) {
    this.initializeApp();

    this.tab1 = MissionPage;
    this.tab2 = MissionPage;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Launches', component: LaunchesPage},
      { title: 'Mission', component: MissionPage}
    ];

    this.cacheService.generateAll();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  updateSearchResults(event: any): void {
    console.log(event.target.value);
  }
}
