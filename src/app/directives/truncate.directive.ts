import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[TruncateText]'
})
export class TruncateDirective implements OnChanges {
  @Input() endLength: number = 10;
  @Input('TruncateText') text: any;
  @Input() startLength: number = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) {
      this.truncateText();
    }
  }

  private truncateText() {
    if (this.text && this.text.length > this.startLength + this.endLength) {
      const truncatedText =
        this.text.substring(0, this.startLength) + '......' + this.text.substring(this.text.length - this.endLength);
      this.renderer.setProperty(this.el.nativeElement, 'textContent', truncatedText);
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', this.text);
    }
  }
}
