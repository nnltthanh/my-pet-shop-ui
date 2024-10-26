import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductDisplayComponent } from './service-product-display.component';

describe('ServiceProductDisplayComponent', () => {
  let component: ServiceProductDisplayComponent;
  let fixture: ComponentFixture<ServiceProductDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProductDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
