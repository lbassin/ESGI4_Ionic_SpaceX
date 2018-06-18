import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionPage } from './mission';

@NgModule({
  declarations: [
    MissionPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionPage),
  ],
})
export class MissionPageModule {}
