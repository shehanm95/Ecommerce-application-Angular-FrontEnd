import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportingComponent } from './admin-reporting.component';

describe('AdminReportingComponent', () => {
  let component: AdminReportingComponent;
  let fixture: ComponentFixture<AdminReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReportingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
