import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeComponent } from './bridge.component';

describe('BridgeComponent', () => {
  let component: BridgeComponent;
  let fixture: ComponentFixture<BridgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BridgeComponent]
    });
    fixture = TestBed.createComponent(BridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
