import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-filters',
  templateUrl: './filters.html',
})
export class FiltersPage {
  order: string;
  year: number;

  availableYears: number[];

  constructor(public viewCtrl: ViewController, private navParams: NavParams) {

    this.initFilters();

    this.availableYears = [];
    for (let i = new Date().getFullYear() + 1; i >= 2006; i--) {
      this.availableYears.push(i);
    }
  }

  close() {
    this.viewCtrl.dismiss({
      order: this.order,
      year: this.year
    });
  }

  private initFilters() {
    this.year = this.navParams.get('launch_year');
    this.order = this.navParams.get('order');
  }
}
