import { NgIterable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, prop: string): NgIterable<any> {
    if (!value.length || !filterString.length) {
      return value;
    }

    let returnValues: any[] = [];
    value.forEach( v => {
      if (v[prop].toLowerCase().lastIndexOf(filterString.toLowerCase()) != -1) {
        returnValues.push(v);
      }
    })

    return returnValues as Iterable<any>;
  }

}
