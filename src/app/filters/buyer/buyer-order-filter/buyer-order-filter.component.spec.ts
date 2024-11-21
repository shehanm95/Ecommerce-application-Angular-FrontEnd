import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrderFilterComponent } from './buyer-order-filter.component';

describe('BuyerOrderFilterComponent', () => {
  let component: BuyerOrderFilterComponent;
  let fixture: ComponentFixture<BuyerOrderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerOrderFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerOrderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
