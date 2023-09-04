import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTruncateText]'
})
export class TruncateTextDirective {
  @Input() set appTruncateText(length: number) {
    const text = this.el.nativeElement.textContent;
    if (text.length > length) {
      const truncatedText = text.substr(0, length / 2) + '...' + text.substr(-length / 2);
      this.renderer.setProperty(this.el.nativeElement, 'textContent', truncatedText);
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
