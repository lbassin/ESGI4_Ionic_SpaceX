import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from "ng2-charts";

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
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FiltersPage } from '../pages/launches/filters/filters';

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
    LaunchChartPage,
    SafChartPage,
    FirstStageChartPage,
    FiltersPage,
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
    LaunchChartPage,
    SafChartPage,
    FirstStageChartPage,
    FiltersPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    CacheService,
    DataService,
    SearchService,
    LocalNotifications,
  ]
})
export class AppModule {
}
