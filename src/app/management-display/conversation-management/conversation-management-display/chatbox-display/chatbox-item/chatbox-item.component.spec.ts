import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxItemComponent } from './chatbox-item.component';

describe('ChatboxItemComponent', () => {
  let component: ChatboxItemComponent;
  let fixture: ComponentFixture<ChatboxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatboxItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
