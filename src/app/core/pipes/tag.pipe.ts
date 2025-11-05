import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag',
  pure: false
})
export class TagPipe implements PipeTransform {

  transform(list: any[], tags: string[]): any[] {
    if (!tags || !tags.length) return list;
    return list.filter(r => {
      return tags.every(t => r.tags.find((rt: any) => rt === t))
    });
  }

}
