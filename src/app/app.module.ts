import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from "ng2-charts";
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { MyApp } from './app.component';
import { LaunchesPage } from '../pages/launches/launches';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LaunchPage } from '../pages/launch/launch';
import { ApiService } from '../providers/api.service';
import { CacheService } from '../providers/cache.service';
import { DataService } from '../providers/data.service';
import { SearchService } from '../providers/search.service';

import { DateFormat } from "../pipes/date-format.pipe";
import { MissionImage } from "../pipes/mission-image.pipe";
import { GeneralPage } from '../pages/launch/general/general';
import { CapsulePage } from '../pages/capsule/capsule';
import { LaunchpadPage } from '../pages/launchpad/launchpad';
import { RocketPage } from '../pages/rocket/rocket';
import { InfosPage } from "../pages/infos/infos";
import { InfosSpaceXPage } from "../pages/infos/infos-space-x/infos-space-x";
import { InfosChartsPage } from "../pages/infos/infos-charts/infos-charts";
import { LaunchChartPage } from "../pages/infos/infos-charts/charts/launch-chart/launch-chart";
import { SafChartPage } from "../pages/infos/infos-charts/charts/saf-chart/saf-chart";
import { FirstStageChartPage } from "../pages/infos/infos-charts/charts/first-stage-chart/first-stage-chart";
import { InfosHistoryPage } from "../pages/infos/infos-history/info-history";
import { InfosHistoryDetailsPage } from "../pages/infos/infos-history/infos-history-details/infos-history-details";


@NgModule({
  declarations: [
    MyApp,
    LaunchesPage,
    LaunchesPage,
    MissionImage,
    DateFormat,
    GeneralPage,
    CapsulePage,
    LaunchPage,
    LaunchpadPage,
    RocketPage,
    InfosPage,
    InfosSpaceXPage,
    InfosChartsPage,
    InfosHistoryPage,
    InfosHistoryDetailsPage,
    LaunchChartPage,
    SafChartPage,
    FirstStageChartPage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXmTZR6BGKCYvV75pM77l1QaVEtpOdE1o'
    }),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LaunchesPage,
    GeneralPage,
    CapsulePage,
    LaunchPage,
    LaunchpadPage,
    RocketPage,
    InfosPage,
    InfosChartsPage,
    InfosSpaceXPage,
    InfosHistoryPage,
    InfosHistoryDetailsPage,
    LaunchChartPage,
    SafChartPage,
    FirstStageChartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    CacheService,
    DataService,
    SearchService,
    InAppBrowser
  ]
})
export class AppModule {
}
