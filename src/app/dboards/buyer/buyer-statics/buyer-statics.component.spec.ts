import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerStaticsComponent } from './buyer-statics.component';

describe('BuyerStaticsComponent', () => {
  let component: BuyerStaticsComponent;
  let fixture: ComponentFixture<BuyerStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerStaticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
