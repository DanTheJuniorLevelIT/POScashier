import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreturnpageComponent } from './viewreturnpage.component';

describe('ViewreturnpageComponent', () => {
  let component: ViewreturnpageComponent;
  let fixture: ComponentFixture<ViewreturnpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewreturnpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewreturnpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
