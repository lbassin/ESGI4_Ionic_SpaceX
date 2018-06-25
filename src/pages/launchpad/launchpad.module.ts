import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaunchpadPage } from './launchpad';

@NgModule({
  declarations: [
    LaunchpadPage,
  ],
  imports: [
    IonicPageModule.forChild(LaunchpadPage),
  ],
})
export class LaunchpadPageModule {}
