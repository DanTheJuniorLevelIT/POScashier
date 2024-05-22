import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittedpageComponent } from './remittedpage.component';

describe('RemittedpageComponent', () => {
  let component: RemittedpageComponent;
  let fixture: ComponentFixture<RemittedpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemittedpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemittedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
