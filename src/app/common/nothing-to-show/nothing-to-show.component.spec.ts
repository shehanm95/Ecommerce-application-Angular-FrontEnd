import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingToShowComponent } from './nothing-to-show.component';

describe('NothingToShowComponent', () => {
  let component: NothingToShowComponent;
  let fixture: ComponentFixture<NothingToShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NothingToShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NothingToShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
