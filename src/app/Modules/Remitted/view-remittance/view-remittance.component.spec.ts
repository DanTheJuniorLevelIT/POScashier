import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRemittanceComponent } from './view-remittance.component';

describe('ViewRemittanceComponent', () => {
  let component: ViewRemittanceComponent;
  let fixture: ComponentFixture<ViewRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRemittanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
