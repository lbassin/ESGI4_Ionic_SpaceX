import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionPage } from './mission';
import { GeneralPage } from './general/general';

@NgModule({
  declarations: [
    MissionPage,
    GeneralPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionPage),
  ],
})
export class MissionPageModule {}
