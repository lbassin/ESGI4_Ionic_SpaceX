import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstStageChartPage } from './first-stage-chart';

@NgModule({
  declarations: [
    FirstStageChartPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstStageChartPage),
  ],
})
export class FirstStageChartPageModule {}
