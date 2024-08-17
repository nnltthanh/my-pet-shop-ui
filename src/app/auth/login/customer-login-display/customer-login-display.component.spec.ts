import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoginDisplayComponent } from './customer-login-display.component';

describe('CustomerLoginDisplayComponent', () => {
  let component: CustomerLoginDisplayComponent;
  let fixture: ComponentFixture<CustomerLoginDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLoginDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerLoginDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
