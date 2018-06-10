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

  public getAllRockets(): Observable<IRocket[]> {
    const endPointUrl: string = this.baseUrl + 'rockets';
    return this.http.get<IRocket[]>(endPointUrl);
  }

  getAllCapsules(): Observable<ICapsule[]> {
    const endPointUrl: string = this.baseUrl + 'capsules';
    return this.http.get<ICapsule[]>(endPointUrl);
  }

  getAllLaunchpads(): Observable<ILaunchpad[]> {
    const endPointUrl: string = this.baseUrl + 'launchpads';
    return this.http.get<ILaunchpad[]>(endPointUrl);
  }
}
