import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDailySalesComponent } from './view-daily-sales.component';

describe('ViewDailySalesComponent', () => {
  let component: ViewDailySalesComponent;
  let fixture: ComponentFixture<ViewDailySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDailySalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDailySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
