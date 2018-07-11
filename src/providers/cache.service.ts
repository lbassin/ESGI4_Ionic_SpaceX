import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CacheService {

  private prefix: string = 'spacex_';
  private timeSuffix: string = '_time';
  private cacheLifetime: number = 7200000; // 2 Hours

  public static rocketsKey: string = 'rockets';
  public static capsulesKey: string = 'capsules';
  public static launchpadsKey: string = 'launchpads';
  public static allLaunchesKey: string = 'all_launches';
  public static pastLaunchesKey: string = 'past_launches';
  public static upcomingLaunchesKey: string = 'upcoming_launches';
  public static infosKey: string = 'infos';
  public static infosHistoryKey: string = 'infos_history';

  constructor(private apiService: ApiService) {
  }

  public get(id: string): Observable<any> {
    return new Observable<any>((observer) => {
      if (this.needToRefresh(id)) {
        observer.next(null);
        observer.complete();
        return;
      }

      const data = localStorage.getItem(this.prefix + id);
      if (!data) {
        observer.next(null);
        observer.complete();
        return;
      }

      observer.next(JSON.parse(data));
      observer.complete();
    });
  }

  public has(id: string) {
    if (this.needToRefresh(id)) {
      return false;
    }

    const data = localStorage.getItem(this.prefix + id);
    return data !== null;
  }

  public generateAll(): void {
    const toCache: Array<{ key: string, data: Observable<any> }> = [
      {key: CacheService.rocketsKey, data: this.apiService.getAllRockets()},
      {key: CacheService.capsulesKey, data: this.apiService.getAllCapsules()},
      {key: CacheService.allLaunchesKey, data: this.apiService.getAllLaunches()},
      {key: CacheService.launchpadsKey, data: this.apiService.getAllLaunchpads()},
      {key: CacheService.pastLaunchesKey, data: this.apiService.getPastLaunches()},
      {key: CacheService.upcomingLaunchesKey, data: this.apiService.getUpcomingLaunches()},
      {key: CacheService.infosKey, data: this.apiService.getCompanyInfos()},
      {key: CacheService.infosHistoryKey, data: this.apiService.getCompanyHistory()},
    ];

    toCache.forEach(element => {
      if (!this.needToRefresh(element.key)) {
        return;
      }

      this.saveApiData(element.data, element.key);
    });
  }

  private needToRefresh(key: string): boolean {
    const cacheKey: string = this.prefix + key;
    const data: any = localStorage.getItem(cacheKey);
    if (data === null) {
      return true;
    }

    const updatedAt: number = parseInt(localStorage.getItem(cacheKey + this.timeSuffix), 10);
    return Date.now() - updatedAt > this.cacheLifetime;
  }

  private saveApiData(observable: Observable<any>, key: string): void {
    observable.toPromise().then((data: any[]) => {
      localStorage.setItem(this.prefix + key, JSON.stringify(data));
      localStorage.setItem(this.prefix + key + this.timeSuffix, Date.now().toString());
    });
  }
}
