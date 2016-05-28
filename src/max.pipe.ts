import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: "max"})
export class MaxPipe implements PipeTransform {
    transform(value, args): any {
        let allowed = args[0],
            received = value.length;

        if (received > allowed && allowed !== 0) {
            let toCut = allowed - received;
            return value.slice(0, toCut);
        }

        return value;
    }
}