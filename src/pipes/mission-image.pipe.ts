import { Injectable, Pipe } from '@angular/core';

@Pipe({
    name: 'missionImage'
})
@Injectable()
export class MissionImage {

    transform(value: any, args?: any) {

        if (value === null) {
            return 'https://i.imgur.com/PXf7knY.png';
        } 
        return value;
    }
}