import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductCalendarDisplayComponent } from './service-product-calendar-display.component';

describe('ServiceProductCalendarDisplayComponent', () => {
  let component: ServiceProductCalendarDisplayComponent;
  let fixture: ComponentFixture<ServiceProductCalendarDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProductCalendarDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProductCalendarDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
