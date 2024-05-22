import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipesss',
  standalone:true
})
export class DatePipe implements PipeTransform {
  transform(date: string): string {
    // Assuming date is in ISO format, you can format it to your desired format
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  }
}
