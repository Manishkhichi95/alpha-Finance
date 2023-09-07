import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDetailsComponent } from './assets-details.component';

describe('AssetsDetailsComponent', () => {
  let component: AssetsDetailsComponent;
  let fixture: ComponentFixture<AssetsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsDetailsComponent]
    });
    fixture = TestBed.createComponent(AssetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
