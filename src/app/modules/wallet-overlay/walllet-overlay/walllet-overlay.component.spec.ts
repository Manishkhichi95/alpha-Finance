import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallletOverlayComponent } from './walllet-overlay.component';

describe('WallletOverlayComponent', () => {
  let component: WallletOverlayComponent;
  let fixture: ComponentFixture<WallletOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WallletOverlayComponent]
    });
    fixture = TestBed.createComponent(WallletOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
