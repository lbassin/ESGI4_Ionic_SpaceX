import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ILaunch } from '../app/models/ILaunch';
import { ICapsule, ICapsulePart } from '../app/models/ICapsule';
import { ILaunchpad } from '../app/models/ILaunchpad';
import { IRocket } from '../app/models/IRocket';
import { ICompanyInfos } from '../app/models/ICompany';
import { IFilter } from '../app/models/IFilter';

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

  public getPastLaunches(filters: IFilter): Observable<ILaunch[]> {
    let  endPointUrl: string = this.baseUrl + 'launches';

    const params = this.filterToQueryString(filters);
    if (params) {
      endPointUrl += '?' + params;
    }

    return this.http.get<ILaunch[]>(endPointUrl);
  }

  public getUpcomingLaunches(filters: IFilter): Observable<ILaunch[]> {
    let endPointUrl: string = this.baseUrl + 'launches/upcoming';

    const params = this.filterToQueryString(filters);
    if (params) {
      endPointUrl += '?' + params;
    }

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

  public getCompanyInfos(): Observable<ICompanyInfos> {
    const endPointUrl: string = this.baseUrl + 'info';
    return this.http.get<ICompanyInfos>(endPointUrl);
  }

  public getCapsuleBySerial(serial: string): Observable<ICapsule> {
    return new Observable<ICapsule>((observer) => {
      const endPointPart: string = this.baseUrl + 'parts/caps/' + serial;
      this.http.get<ICapsulePart>(endPointPart).toPromise().then((part: ICapsulePart) => {
        const endPointCapsule: string = this.baseUrl + 'capsules/' + part.capsule_id;

        this.http.get<ICapsule>(endPointCapsule).subscribe((capsule: ICapsule) => {
          observer.next(capsule);
          observer.complete();
        })
      });
    });
  }

  private filterToQueryString(filters: IFilter) {
    if (!filters) {
      return '';
    }

    return Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
  }

}
