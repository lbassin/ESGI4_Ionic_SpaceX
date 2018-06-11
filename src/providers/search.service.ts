import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISearchResult, ISearchResultEntry, ISearchResultGroup } from '../app/models/ISearchResult';
import { DataService } from './data.service';
import { IRocket } from '../app/models/IRocket';
import { ICapsule } from '../app/models/ICapsule';
import { ILaunchpad } from '../app/models/ILaunchpad';

@Injectable()
export class SearchService {

  private subject: Subject<ISearchResult>;
  private result: ISearchResult;

  constructor(private dataService: DataService) {
    this.subject = new Subject<ISearchResult>();
    this.result = {groups: []} as ISearchResult;
  }

  public getObservable(): Observable<ISearchResult> {
    return this.subject.asObservable();
  }

  public updateResults(text: string): void {
    if (!text || text.length <= 0) {
      this.result = {} as ISearchResult;
      this.subject.next(this.result);
      return;
    }

    this.result = {groups: []} as ISearchResult;

    this.searchRockets(text);
    this.searchCapsules(text);
    this.searchLaunchpads(text);

    this.subject.next(this.result);
  }

  private searchRockets(text: string): void {
    const results = {} as ISearchResultGroup;
    results.label = 'Rockets';
    results.data = [];

    this.dataService.getAllRockets().subscribe((rockets: IRocket[]) => {
      rockets.forEach((rocket: IRocket) => {
        const match = this.searchThroughObject(rocket, text);

        if (match) {
          results.data.push({
            title: rocket.name,
            description: rocket.description,
            image: 'https://dummyimage.com/120x120'
          } as ISearchResultEntry);
        }
      });

      this.result.groups.push(results);
      this.subject.next(this.result);
    });
  }

  private searchCapsules(text: string): void {
    const results = {} as ISearchResultGroup;
    results.label = 'Capsules';
    results.data = [];

    this.dataService.getAllCapsules().subscribe((capsules: ICapsule[]) => {
      capsules.forEach((capsule: ICapsule) => {
        const match = this.searchThroughObject(capsule, text);

        if (match) {
          results.data.push({
            title: capsule.name,
            description: '',
            image: 'https://dummyimage.com/120x120'
          } as ISearchResultEntry);
        }
      });

      this.result.groups.push(results);
      this.subject.next(this.result);
    });
  }

  private searchLaunchpads(text: string): void {
    const results = {} as ISearchResultGroup;
    results.label = 'Launchpads';
    results.data = [];

    this.dataService.getAllLaunchpads().subscribe((launchpads: ILaunchpad[]) => {
      launchpads.forEach((launchpad: ILaunchpad) => {
        const match = this.searchThroughObject(launchpad, text);

        if (match) {
          results.data.push({
            title: launchpad.full_name,
            description: launchpad.details,
            image: 'https://dummyimage.com/120x120'
          } as ISearchResultEntry);
        }
      });

      this.result.groups.push(results);
      this.subject.next(this.result);
    });
  }

  private searchThroughObject(object: any, search: string): boolean {
    let found: boolean = false;

    for (let key in object) {
      if (!object.hasOwnProperty(key)) {
        continue;
      }

      const isObject = typeof object[key] === "object";
      if (isObject) {
        const subSearchFound = this.searchThroughObject(object[key], search);
        if (subSearchFound) {
          found = true;
          break;
        }
        continue;
      }

      const isString = typeof object[key] === "string";
      if (!isString) {
        continue;
      }

      if (object[key].toLowerCase().includes(search.toLowerCase())) {
        console.log('found');
        found = true;
        break;
      }
    }

    return found;
  }
}
