import { Component, Input } from '@angular/core';
import { IRocket } from '../../app/models/IRocket';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html'
})
export class RocketComponent {
  @Input() rocket: IRocket;
}
