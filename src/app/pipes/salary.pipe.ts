import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'salary'})
export class SalaryPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString();
  }
}
