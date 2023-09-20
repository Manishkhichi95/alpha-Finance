import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[TruncateText]'
})
export class TruncateDirective implements OnInit {
  @Input('TruncateText') text: any;
  @Input() startLength: number = 10;
  @Input() endLength: number = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.text.length > this.startLength+this.endLength) {
      const truncatedText = this.text.substring(0, this.startLength) + '......' + this.text.substring( this.text.length-this.endLength);
      this.renderer.setProperty(this.el.nativeElement, 'textContent', truncatedText);
    }
  }
}
