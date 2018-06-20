import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LaunchesPage } from '../pages/launches/launches';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MissionPage } from '../pages/mission/mission';
import { ApiService } from '../providers/api.service';
import { CacheService } from '../providers/cache.service';
import { DataService } from '../providers/data.service';

import { DateFormat } from "../pipes/date-format.pipe";
import { MissionImage } from "../pipes/mission-image.pipe";
import { GeneralPage } from '../pages/mission/general/general';

@NgModule({
  declarations: [
    MyApp,
    LaunchesPage,
    MissionPage,
    LaunchesPage,
    MissionImage,
    DateFormat,
    GeneralPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LaunchesPage,
    MissionPage,
    GeneralPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    CacheService,
    DataService
  ]
})
export class AppModule {
}
