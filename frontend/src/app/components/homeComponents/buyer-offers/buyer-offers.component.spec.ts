import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOffersComponent } from './buyer-offers.component';

describe('BuyerOffersComponent', () => {
  let component: BuyerOffersComponent;
  let fixture: ComponentFixture<BuyerOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
