import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreportpageComponent } from './salesreportpage.component';

describe('SalesreportpageComponent', () => {
  let component: SalesreportpageComponent;
  let fixture: ComponentFixture<SalesreportpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesreportpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesreportpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
