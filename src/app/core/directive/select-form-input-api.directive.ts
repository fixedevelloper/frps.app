import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import Choices from 'choices.js';

@Directive({
  selector: '[selectFormInputDynamic]',
  standalone: true,
})
export class SelectFormInputApiDirective implements OnChanges {
  @Input() choices: any[] = [];

  private instance: Choices | null = null;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['choices'] && this.choices && this.choices.length > 0) {
      this.initChoices();
    }
  }

  private initChoices(): void {
    // Détruire l'ancienne instance si elle existe
    if (this.instance) {
      this.instance.destroy();
    }

    this.instance = new Choices(this.el.nativeElement, {
      placeholder: true,
      searchEnabled: true,
      removeItemButton: false,
      shouldSort: false,
      allowHTML: false,
      itemSelectText: '',
    });

    this.instance.setChoices(
      this.choices.map((c) => ({
        value: c.id,
        label: c.name,
      })),
      'value',
      'label',
      true
    );
  }
}
