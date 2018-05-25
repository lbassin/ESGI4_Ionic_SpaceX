import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ILaunch } from './../../app/models/ILaunch';

@Injectable()
export class SpacexApiProvider {

    private baseUrl: string = 'https://api.spacexdata.com/v2'

    constructor(public http: HttpClient) { }

    public getAllLaunches(): Observable<ILaunch[]> {
        const endPointUrl: string = `${this.baseUrl}/launches/all`;
        return this.http.get<ILaunch[]>(endPointUrl);
    }
}