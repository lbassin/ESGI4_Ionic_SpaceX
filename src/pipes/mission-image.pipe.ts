import { Injectable, Pipe } from '@angular/core';

@Pipe({
    name: 'missionImage'
})
@Injectable()
export class MissionImage {

    transform(value: any, args?: any) {

        if (value === null) {
            return 'http://freedesignfile.com/upload/2017/08/rocket-icon-vector.png';
        } 
        return value;
    }
}