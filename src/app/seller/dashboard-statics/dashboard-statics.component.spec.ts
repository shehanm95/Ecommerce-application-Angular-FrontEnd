import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStaticsComponent } from './dashboard-statics.component';

describe('DashboardStaticsComponent', () => {
  let component: DashboardStaticsComponent;
  let fixture: ComponentFixture<DashboardStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStaticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
