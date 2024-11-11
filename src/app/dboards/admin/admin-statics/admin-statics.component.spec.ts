import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaticsComponent } from './admin-statics.component';

describe('AdminStaticsComponent', () => {
  let component: AdminStaticsComponent;
  let fixture: ComponentFixture<AdminStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStaticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
