import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISearchResult, ISearchResultEntry, ISearchResultGroup } from '../app/models/ISearchResult';
import { DataService } from './data.service';
import { IRocket } from '../app/models/IRocket';
import { ICapsule } from '../app/models/ICapsule';
import { ILaunchpad } from '../app/models/ILaunchpad';
import { ILaunch } from '../app/models/ILaunch';

@Injectable()
export class SearchService {

  private static readonly dummyImage: string = 'https://dummyimage.com/120x120';

  private dataSource: Array<{ data: Observable<any>, resultHandler: any }>;
  private subject: Subject<ISearchResult>;
  private result: ISearchResult;

  constructor(private dataService: DataService) {
    this.subject = new Subject<ISearchResult>();
    this.result = {groups: []} as ISearchResult;

    this.dataSource = [
      {data: this.dataService.getAllRockets(), resultHandler: SearchService.addRocketToResults},
      {data: this.dataService.getAllCapsules(), resultHandler: SearchService.addCapsuleToResults},
      {data: this.dataService.getAllLaunchpads(), resultHandler: SearchService.addLaunchpadToResults},
      {data: this.dataService.getAllLaunches(), resultHandler: SearchService.addLaunchToResults}
    ];
  }

  public getObservable(): Observable<ISearchResult> {
    return this.subject.asObservable();
  }

  public updateResults(text: string): void {
    this.result = {groups: []} as ISearchResult;

    if (!text || text.length <= 0) {
      this.defaultResults();
      return;
    }
    this.searchResults(text);

    this.subject.next(this.result);
  }

  private searchResults(text: string): void {
    this.dataSource.forEach((elements: { data: Observable<any>, resultHandler: any }) => {
      elements.data.subscribe((data: any) => {
        let results = {data: []} as ISearchResultGroup;

        data.forEach((element: any) => {
          if (!this.searchThroughObject(element, text)) {
            return;
          }

          results = elements.resultHandler(results, element);
        });

        this.result.groups.push(results);
        this.subject.next(this.result);
      });
    })
  }

  private defaultResults(): void {
    const elementMaxCount = 3;

    this.dataSource.forEach((elements: { data: Observable<any>, resultHandler: any }) => {
      elements.data.subscribe((data: any) => {
        let results = {data: []} as ISearchResultGroup;

        data.slice(0, elementMaxCount).forEach((element: any) => {
          results = elements.resultHandler(results, element);
        });

        this.result.groups.push(results);
        this.subject.next(this.result);
      });
    })
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
        found = true;
        break;
      }
    }

    return found;
  }

  private static addRocketToResults(results: ISearchResultGroup, rocket: IRocket): ISearchResultGroup {
    results.label = results.label ? results.label : 'Rockets';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: rocket.name,
      description: rocket.description,
      image: SearchService.dummyImage
    } as ISearchResultEntry);

    return results;
  }

  private static addCapsuleToResults(results: ISearchResultGroup, capsule: ICapsule): ISearchResultGroup {
    results.label = results.label ? results.label : 'Capsules';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: capsule.name,
      description: '',
      image: SearchService.dummyImage
    } as ISearchResultEntry);

    return results;
  }

  private static addLaunchpadToResults(results: ISearchResultGroup, launchpad: ILaunchpad): ISearchResultGroup {
    results.label = results.label ? results.label : 'Launchpads';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: launchpad.full_name,
      description: launchpad.details,
      image: SearchService.dummyImage
    } as ISearchResultEntry);

    return results;
  }

  private static addLaunchToResults(results: ISearchResultGroup, launch: ILaunch): ISearchResultGroup {
    results.label = results.label ? results.label : 'Launches';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: launch.mission_name,
      description: launch.details,
      image: launch.links.mission_patch_small ? launch.links.mission_patch_small : SearchService.dummyImage
    } as ISearchResultEntry);

    return results;
  }
}
