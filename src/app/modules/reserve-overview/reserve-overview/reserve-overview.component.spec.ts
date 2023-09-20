import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveOverviewComponent } from './reserve-overview.component';

describe('ReserveOverviewComponent', () => {
  let component: ReserveOverviewComponent;
  let fixture: ComponentFixture<ReserveOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveOverviewComponent]
    });
    fixture = TestBed.createComponent(ReserveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
