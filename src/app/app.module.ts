import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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
import { RocketComponent } from '../components/rocket/rocket.component';

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
    RocketComponent
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
    GeneralPage,
    CapsulePage,
    LaunchPage,
    LaunchpadPage,
    RocketPage,
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
