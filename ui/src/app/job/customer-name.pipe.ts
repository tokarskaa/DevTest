import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customerName'})
export class CustomerNamePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value : 'Unknown';
  }
}
