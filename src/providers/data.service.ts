import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IRocket } from '../app/models/IRocket';
import { ILaunchpad } from '../app/models/ILaunchpad';
import { ICapsule } from '../app/models/ICapsule';
import { ILaunch } from '../app/models/ILaunch';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

@Injectable()
export class DataService {

  constructor(private apiService: ApiService, private cacheService: CacheService) {
  }

  public getAllLaunches(): Observable<ILaunch[]> {
    return this.apiService.getAllLaunches();
  }

  public getNextLaunch(): Observable<ILaunch> {
    return this.apiService.getNextLaunch();
  }

  public getPastLaunches(): Observable<ILaunch[]> {
    if (this.cacheService.has(CacheService.pastLaunchesKey)) {
      return this.cacheService.get(CacheService.pastLaunchesKey);
    }

    return this.apiService.getPastLaunches();
  }

  public getUpcomingLaunches(): Observable<ILaunch[]> {
    if (this.cacheService.has(CacheService.upcomingLaunchesKey)) {
      return this.cacheService.get(CacheService.upcomingLaunchesKey);
    }

    return this.apiService.getUpcomingLaunches();
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
}
