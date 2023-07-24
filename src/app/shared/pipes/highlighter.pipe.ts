import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter',
})
export class HighlighterPipe implements PipeTransform {
  public transform(value: string, args: string): unknown {
    if (!args) return value;
    const reg = new RegExp(`${args}`, 'im');
    const newValue: string = value.replace(
      reg,
      '<span class="highlighted-text">$&</span>'
    );
    return newValue;
  }
}
