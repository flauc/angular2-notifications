import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'max'})
export class MaxPipe implements PipeTransform {
    transform(value, args) : any {
        let allowed = args[0];
        let received = value.length;

        if(received > allowed && allowed != 0) {
            let toCut = allowed - received;
            return value.slice(0, toCut);
        }

        return value;
    }
}