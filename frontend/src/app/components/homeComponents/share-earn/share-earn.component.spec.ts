import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareEarnComponent } from './share-earn.component';

describe('ShareEarnComponent', () => {
  let component: ShareEarnComponent;
  let fixture: ComponentFixture<ShareEarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareEarnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
