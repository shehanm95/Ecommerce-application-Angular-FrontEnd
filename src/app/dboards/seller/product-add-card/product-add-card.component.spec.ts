import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddCardComponent } from './product-add-card.component';

describe('ProductAddCardComponent', () => {
  let component: ProductAddCardComponent;
  let fixture: ComponentFixture<ProductAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
