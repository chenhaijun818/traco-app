import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], options: any): any[] {
    const entries = Object.entries(options);
    return list.filter(e => {
      return entries.every(([key, value]) => {
        return e[key] === value || !value;
      });
    })
  }

}
