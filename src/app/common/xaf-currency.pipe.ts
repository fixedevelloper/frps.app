import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xafCurrency'
})
export class XafCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return '';
    return `${value.toLocaleString('fr-FR')} FCFA`;
  }
}
