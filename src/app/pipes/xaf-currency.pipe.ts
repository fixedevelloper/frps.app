import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xafCurrency',
  standalone: true
})
export class XafCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) return '';
    // Formater avec le séparateur de milliers et le symbole après
    return `${value.toLocaleString('fr-CM')} XAF`;
  }

}
