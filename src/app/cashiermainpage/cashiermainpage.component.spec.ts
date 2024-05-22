import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashiermainpageComponent } from './cashiermainpage.component';

describe('CashiermainpageComponent', () => {
  let component: CashiermainpageComponent;
  let fixture: ComponentFixture<CashiermainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashiermainpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashiermainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
