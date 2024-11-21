import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySellerDetailComponent } from './display-seller-detail.component';

describe('DisplaySellerDetailComponent', () => {
  let component: DisplaySellerDetailComponent;
  let fixture: ComponentFixture<DisplaySellerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySellerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySellerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
