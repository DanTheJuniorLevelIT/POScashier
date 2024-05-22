import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpimgpageComponent } from './upimgpage.component';

describe('UpimgpageComponent', () => {
  let component: UpimgpageComponent;
  let fixture: ComponentFixture<UpimgpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpimgpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpimgpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
