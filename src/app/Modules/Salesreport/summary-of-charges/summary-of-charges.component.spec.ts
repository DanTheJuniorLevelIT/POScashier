import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOfChargesComponent } from './summary-of-charges.component';

describe('SummaryOfChargesComponent', () => {
  let component: SummaryOfChargesComponent;
  let fixture: ComponentFixture<SummaryOfChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryOfChargesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryOfChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
