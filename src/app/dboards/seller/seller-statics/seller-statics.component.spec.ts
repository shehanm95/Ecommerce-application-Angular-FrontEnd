import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerStaticsComponent } from './seller-statics.component';

describe('SellerStaticsComponent', () => {
  let component: SellerStaticsComponent;
  let fixture: ComponentFixture<SellerStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerStaticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
