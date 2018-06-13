import { Injectable, Pipe } from '@angular/core';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Pipe({
    name: 'dateFormat'
})
@Injectable()
export class DateFormat {

    transform(value: any, args?: any) {

        let elementDate = new Date(value);
        return elementDate.getDate()
                + ' ' + monthNames[elementDate.getMonth()]
                + ' ' + elementDate.getFullYear()
                + ' ~ ' + ('0' + elementDate.getHours()).slice(-2)
                + ':' + ('0' + elementDate.getMinutes()).slice(-2)
                + ':' + ('0' + elementDate.getSeconds()).slice(-2)
                + ' (UTC+2)';
    }
}