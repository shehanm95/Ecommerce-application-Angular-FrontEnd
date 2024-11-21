import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderFilterComponent } from './seller-order-filter.component';

describe('SellerOrderFilterComponent', () => {
  let component: SellerOrderFilterComponent;
  let fixture: ComponentFixture<SellerOrderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerOrderFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerOrderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
