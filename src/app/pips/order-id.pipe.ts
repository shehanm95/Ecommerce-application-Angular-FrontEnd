import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderID',
  standalone: true
})
export class OrderIDPipe implements PipeTransform {

  transform(orderNumber: number): string {
    if (orderNumber < 1 || orderNumber > 9999) {
      throw new Error('Order number must be between 1 and 9999');
    }

    // Format order number with leading zeros
    const formattedNumber = orderNumber.toString().padStart(4, '0');

    // Prefix with #ORD
    return `#ORD${formattedNumber}`;
  }

}
