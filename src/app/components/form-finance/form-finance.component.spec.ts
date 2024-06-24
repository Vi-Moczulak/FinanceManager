import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinanceComponent } from './form-finance.component';

describe('FormFinanceComponent', () => {
  let component: FormFinanceComponent;
  let fixture: ComponentFixture<FormFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFinanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
