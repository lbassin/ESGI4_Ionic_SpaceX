import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ILaunch } from '../app/models/ILaunch';
import { ICapsule } from '../app/models/ICapsule';
import { ILaunchpad } from '../app/models/ILaunchpad';
import { IRocket } from '../app/models/IRocket';

@Injectable()
export class ApiService {

  private baseUrl: string = 'https://api.spacexdata.com/v2/';

  constructor(public http: HttpClient) {
  }

  public getAllLaunches(): Observable<ILaunch[]> {
    const endPointUrl: string = this.baseUrl + 'launches/all';
    return this.http.get<ILaunch[]>(endPointUrl);
  }

  public getNextLaunch(): Observable<ILaunch> {
    const endPointUrl: string = this.baseUrl + 'launches/next';
    return this.http.get<ILaunch>(endPointUrl);
  }

  public getPastLaunches(): Observable<ILaunch[]> {
    const endPointUrl: string = this.baseUrl + 'launches';
    return this.http.get<ILaunch[]>(endPointUrl);
  }

  public getUpcomingLaunches(): Observable<ILaunch[]> {
    const endPointUrl: string = this.baseUrl + 'launches/upcoming';
    return this.http.get<ILaunch[]>(endPointUrl);
  }

  public getAllRockets(): Observable<IRocket[]> {
    const endPointUrl: string = this.baseUrl + 'rockets';
    return this.http.get<IRocket[]>(endPointUrl);
  }

  public getAllCapsules(): Observable<ICapsule[]> {
    const endPointUrl: string = this.baseUrl + 'capsules';
    return this.http.get<ICapsule[]>(endPointUrl);
  }

  public getAllLaunchpads(): Observable<ILaunchpad[]> {
    const endPointUrl: string = this.baseUrl + 'launchpads';
    return this.http.get<ILaunchpad[]>(endPointUrl);
  }

  public getRocketById(id: string): Observable<IRocket> {
    const endPointUrl: string = this.baseUrl + 'rockets/' + id;
    return this.http.get<IRocket>(endPointUrl);
  }
}
