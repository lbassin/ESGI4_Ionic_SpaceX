import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CacheService {

  private prefix: string = 'spacex_';
  private timeSuffix: string = '_time';

  private rocketsKey: string = 'rockets';
  private capsulesKey: string = 'capsules';
  private launchepadsKey: string = 'launchpads';

  constructor(private apiProvider: ApiService) {
  }

  public set(key: string, data: any) {

  }

  public get(key: string) {

  }

  public generateAll(): void {
    this.generateRockets();
    this.generateCapsules();
    this.generateLaunchpads();
  }

  private generateRockets(): void {
    if (!this.needToRefresh(this.rocketsKey)) {
      return;
    }

    this.saveApiData(this.apiProvider.getAllRockets(), this.rocketsKey);
  }

  private generateCapsules(): void {
    if (!this.needToRefresh(this.capsulesKey)) {
      return;
    }

    this.saveApiData(this.apiProvider.getAllCapsules(), this.capsulesKey);
  }

  private generateLaunchpads(): void {
    if (!this.needToRefresh(this.launchepadsKey)) {
      return;
    }

    this.saveApiData(this.apiProvider.getAllLaunchpads(), this.launchepadsKey);
  }

  private needToRefresh(key: string): boolean {
    return !localStorage.getItem(this.prefix + key);
  }

  private saveApiData(observable: Observable<any>, key: string): void {
    observable.toPromise().then((data: any[]) => {
      localStorage.setItem(this.prefix + key, JSON.stringify(data));
      localStorage.setItem(this.prefix + key + this.timeSuffix, '');
    });
  }

}
