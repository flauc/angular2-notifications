import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'maxCharactere'})
export class MaxCharacterePipe implements PipeTransform {
  transform(value: string, allowed: number): any {
    let received = value.length;

    if (received > allowed && allowed !== 0) {
      let toCut = allowed - received;
      return value.slice(0, toCut);
    }

    return value;
  }
}
