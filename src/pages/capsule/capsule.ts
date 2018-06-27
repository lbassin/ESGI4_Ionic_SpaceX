import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ICapsule } from '../../app/models/ICapsule';

@IonicPage()
@Component({
  selector: 'page-capsule',
  templateUrl: 'capsule.html',
})
export class CapsulePage {

  capsule: ICapsule;

  constructor(private navParams: NavParams) {
    this.capsule = this.navParams.get('data');    
  }
}
