import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddCategoryComponent } from './seller-add-category.component';

describe('SellerAddCategoryComponent', () => {
  let component: SellerAddCategoryComponent;
  let fixture: ComponentFixture<SellerAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
