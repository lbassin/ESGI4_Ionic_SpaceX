import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { LaunchesPage } from '../pages/launches/launches';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MissionPage } from '../pages/mission/mission';
import { ApiService } from '../providers/api.service';
import { CacheService } from '../providers/cache.service';
import { DataService } from '../providers/data.service';
import { SearchService } from '../providers/search.service';

import { DateFormat } from "../pipes/date-format.pipe";
import { MissionImage } from "../pipes/mission-image.pipe";
import { GeneralPage } from '../pages/mission/general/general';
import { SpacexApiProvider } from '../providers/spacex-api/spacex-api';
import {InfosPage} from "../pages/infos/infos";
import {InfosSpaceXPage} from "../pages/infos/infos-space-x/infos-space-x";
import {InfosChartsPage} from "../pages/infos/infos-charts/infos-charts";

@NgModule({
  declarations: [
    MyApp,
    LaunchesPage,
    MissionPage,
    LaunchesPage,
    MissionImage,
    DateFormat,
    GeneralPage,
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
    LaunchesPage,
    MissionPage,
    GeneralPage,
    InfosPage,
    InfosChartsPage,
    InfosSpaceXPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    CacheService,
    DataService,
    SearchService,
  ]
})
export class AppModule {
}
