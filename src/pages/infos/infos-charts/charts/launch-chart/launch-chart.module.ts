import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaunchChartPage } from './launch-chart';

@NgModule({
  declarations: [
    LaunchChartPage,
  ],
  imports: [
    IonicPageModule.forChild(LaunchChartPage),
  ],
})
export class LaunchChartPageModule {}
