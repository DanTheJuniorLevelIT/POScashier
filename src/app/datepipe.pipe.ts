import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterByDate',
  standalone: true
})
export class SearchFilterByDatePipe implements PipeTransform {
  transform(value: any[], startDate: string, endDate: string): any[] {
    if (!value) return [];
    if (!startDate || !endDate) return value;

    // Parse start and end dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    return value.filter(function (item: any) {
      const regDate = new Date(item.return_date); // Assuming 'return_date' is the date field in the 'item' object
      return regDate >= start && regDate <= end;
    });
    
  }
}
