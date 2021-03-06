import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IRocket } from '../app/models/IRocket';
import { ILaunchpad } from '../app/models/ILaunchpad';
import { ICapsule } from '../app/models/ICapsule';
import { ILaunch } from '../app/models/ILaunch';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';
import { ICompanyInfos, ICompanyHistory } from '../app/models/ICompany';
import { IFilter } from '../app/models/IFilter';

@Injectable()
export class DataService {

  constructor(private apiService: ApiService, private cacheService: CacheService) {
  }

  public getAllLaunches(): Observable<ILaunch[]> {
    if (this.cacheService.has(CacheService.allLaunchesKey)) {
      return this.cacheService.get(CacheService.allLaunchesKey);
    }

    return this.apiService.getAllLaunches();
  }

  public getNextLaunch(): Observable<ILaunch> {
    return this.apiService.getNextLaunch();
  }

  public getPastLaunches(filters: IFilter): Observable<ILaunch[]> {
    if (Object.keys(filters).length === 0 && this.cacheService.has(CacheService.pastLaunchesKey)) {
      return this.cacheService.get(CacheService.pastLaunchesKey);
    }

    return this.apiService.getPastLaunches(filters);
  }

  public getUpcomingLaunches(filters: IFilter): Observable<ILaunch[]> {
    if (Object.keys(filters).length === 0 && this.cacheService.has(CacheService.upcomingLaunchesKey)) {
      return this.cacheService.get(CacheService.upcomingLaunchesKey);
    }

    return this.apiService.getUpcomingLaunches(filters);
  }

  public getAllRockets(): Observable<IRocket[]> {
    if (this.cacheService.has(CacheService.rocketsKey)) {
      return this.cacheService.get(CacheService.rocketsKey);
    }

    return this.apiService.getAllRockets();
  }

  public getAllCapsules(): Observable<ICapsule[]> {
    if (this.cacheService.has(CacheService.capsulesKey)) {
      return this.cacheService.get(CacheService.capsulesKey);
    }

    return this.apiService.getAllCapsules();
  }

  public getAllLaunchpads(): Observable<ILaunchpad[]> {
    if (this.cacheService.has(CacheService.launchpadsKey)) {
      return this.cacheService.get(CacheService.launchpadsKey);
    }

    return this.apiService.getAllLaunchpads();
  }

  public getRocketById(id: string): Observable<IRocket> {
    if (this.cacheService.has(CacheService.rocketsKey)) {
      return new Observable<IRocket>((observer) => {
        this.cacheService.get(CacheService.rocketsKey).toPromise().then((rockets: IRocket[]) => {
          const rocket = rockets.find((rocket: IRocket) => {
            return rocket.id === id;
          });

          if (rocket) {
            observer.next(rocket);
          }
          observer.complete()
        });
      });
    }

    return this.apiService.getRocketById(id);
  }

  public getCompanyInfos(): Observable<ICompanyInfos> {
    if (this.cacheService.has(CacheService.infosKey)) {
      return this.cacheService.get(CacheService.infosKey);
    }

    return this.apiService.getCompanyInfos();
  }

  public getCompanyHistory(): Observable<ICompanyHistory[]> {
    if (this.cacheService.has(CacheService.infosHistoryKey)) {
      return this.cacheService.get(CacheService.infosHistoryKey);
    }

    return this.apiService.getCompanyHistory();
  }

  public getCapsuleBySerial(serial: string): Observable<ICapsule> {
    return this.apiService.getCapsuleBySerial(serial);
  }
}
