import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LaunchesPage } from '../pages/launches/launches';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpacexApiProvider } from '../providers/spacex-api/spacex-api';
import {InfosPage} from "../pages/infos/infos";
import {InfosSpaceXPage} from "../pages/infos/infos-space-x/infos-space-x";
import {InfosChartsPage} from "../pages/infos/infos-charts/infos-charts";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LaunchesPage,
    InfosPage,
    InfosSpaceXPage,
    InfosChartsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXmTZR6BGKCYvV75pM77l1QaVEtpOdE1o'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LaunchesPage,
    InfosPage,
    InfosChartsPage,
    InfosSpaceXPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpacexApiProvider
  ]
})
export class AppModule {}
