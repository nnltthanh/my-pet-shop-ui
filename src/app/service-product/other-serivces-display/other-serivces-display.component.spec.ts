import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSerivcesDisplayComponent } from './other-serivces-display.component';

describe('OtherSerivcesDisplayComponent', () => {
  let component: OtherSerivcesDisplayComponent;
  let fixture: ComponentFixture<OtherSerivcesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherSerivcesDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherSerivcesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
