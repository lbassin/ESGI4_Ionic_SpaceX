import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISearchResult, ISearchResultEntry, ISearchResultGroup } from '../app/models/ISearchResult';
import { DataService } from './data.service';
import { IRocket } from '../app/models/IRocket';
import { ICapsule } from '../app/models/ICapsule';
import { ILaunchpad } from '../app/models/ILaunchpad';
import { ILaunch } from '../app/models/ILaunch';
import { RocketPage } from '../pages/rocket/rocket';
import { CapsulePage } from '../pages/capsule/capsule';
import { LaunchpadPage } from '../pages/launchpad/launchpad';
import { LaunchPage } from '../pages/launch/launch';

interface ISearcher {
  data: Observable<any>,
  resultHandler: any,
  page: any,
}

@Injectable()
export class SearchService {

  private dataSource: Array<{ data: Observable<any>, resultHandler: any, page: any }>;
  private subject: Subject<ISearchResult>;
  private result: ISearchResult;

  constructor(private dataService: DataService) {
    this.subject = new Subject<ISearchResult>();
    this.result = {groups: []} as ISearchResult;

    this.dataSource = [
      {
        data: this.dataService.getAllRockets(),
        resultHandler: SearchService.addRocketToResults,
        page: RocketPage
      },
      {
        data: this.dataService.getAllCapsules(),
        resultHandler: SearchService.addCapsuleToResults,
        page: CapsulePage
      },
      {
        data: this.dataService.getAllLaunchpads(),
        resultHandler: SearchService.addLaunchpadToResults,
        page: LaunchpadPage
      },
      {
        data: this.dataService.getAllLaunches(),
        resultHandler: SearchService.addLaunchToResults,
        page: LaunchPage

      }
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
  }

  private searchResults(text: string): void {
    this.dataSource.forEach((elements: ISearcher) => {
      elements.data.subscribe((data: any) => {
        let results = {data: []} as ISearchResultGroup;

        data.forEach((element: any) => {
          if (!this.searchThroughObject(element, text)) {
            return;
          }

          results = elements.resultHandler(results, element, elements.page);
        });

        this.result.groups.push(results);
        this.subject.next(this.result);
      });
    })
  }

  private defaultResults(): void {
    const elementMaxCount = 30;

    this.dataSource.forEach((elements: ISearcher) => {
      elements.data.subscribe((data: any) => {
        let results = {data: []} as ISearchResultGroup;

        data.reverse().slice(0, elementMaxCount).forEach((element: any) => {
          results = elements.resultHandler(results, element, elements.page);
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

  private static addRocketToResults(results: ISearchResultGroup, rocket: IRocket, page: any): ISearchResultGroup {
    results.label = results.label ? results.label : 'Rockets';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: rocket.name,
      description: rocket.description,
      image: 'http://freedesignfile.com/upload/2017/08/rocket-icon-vector.png',
      page: page,
      data: rocket
    } as ISearchResultEntry);

    return results;
  }

  private static addCapsuleToResults(results: ISearchResultGroup, capsule: ICapsule, page: any): ISearchResultGroup {
    results.label = results.label ? results.label : 'Capsules';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: capsule.name,
      description: '',
      image: 'https://3dexport.com/items/2005/10/11/2697/147771/dragon_spacex_3d_model_vray_3ds_max_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1694359_o.png',
      page: page,
      data: capsule
    } as ISearchResultEntry);

    return results;
  }

  private static addLaunchpadToResults(results: ISearchResultGroup, launchpad: ILaunchpad, page: any): ISearchResultGroup {
    results.label = results.label ? results.label : 'Launchpads';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: launchpad.full_name,
      description: launchpad.details,
      image: 'https://www.languagesim.com/wp-content/uploads/2014/07/simple-globe-md.png',
      page: page,
      data: launchpad,
    } as ISearchResultEntry);

    return results;
  }

  private static addLaunchToResults(results: ISearchResultGroup, launch: ILaunch, page: any): ISearchResultGroup {
    results.label = results.label ? results.label : 'Launches';
    results.data = results.data ? results.data : [];

    results.data.push({
      title: launch.mission_name,
      description: launch.details,
      image: launch.links.mission_patch_small ? launch.links.mission_patch_small : "https://i.imgur.com/PXf7knY.png",
      page: page,
      data: launch
    } as ISearchResultEntry);

    return results;
  }
}
