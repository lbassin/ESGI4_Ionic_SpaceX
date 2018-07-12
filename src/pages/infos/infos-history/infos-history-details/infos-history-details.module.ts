import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfosHistoryDetailsPage } from './infos-history-details';

@NgModule({
  declarations: [
    InfosHistoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InfosHistoryDetailsPage),
  ],
})
export class InfoHistoryDetailsPageModule {}
