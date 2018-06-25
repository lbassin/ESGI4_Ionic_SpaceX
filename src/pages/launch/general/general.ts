import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ILaunch } from '../../../app/models/ILaunch';

@Component({
    templateUrl: 'general.html',
})
export class GeneralPage {

    launch: ILaunch;

    constructor(private navParams: NavParams) {
        this.launch = this.navParams.data;
    }
}
