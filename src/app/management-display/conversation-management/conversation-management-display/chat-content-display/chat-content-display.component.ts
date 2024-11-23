import { Component, effect, ElementRef, inject, input, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ChatMessageService, Conversation, Message } from '../../../../services/chat-message.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../auth.service';
import { getLoggedInUserId, UserService } from '../../../../services/user.service';
import { User } from '../../../../auth/user.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-content-display',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './chat-content-display.component.html',
  styleUrl: './chat-content-display.component.scss'
})
export class ChatContentDisplayComponent {

  messageForm = viewChild<NgForm>('messageForm');

  messageContainer = viewChild<ElementRef<any>>('messageContainer');

  messages = input<Message[]>();

  selectedConversationId = input<number>();

  messageLists: Message[] = [];

  loggedUserId = getLoggedInUserId();

  messageService = inject(ChatMessageService);

  constructor() {
    effect(() => {
      if (this.messages()) {
        this.messageLists = this.messages()!;
      }
    })
  }

  addMessage($event: any) {
    if (!$event) {
      return;
    }

    let message = new Message();
    message.content = $event;
    message.sender = new User({id: getLoggedInUserId()});
    let conversation = new Conversation();
    if (this.selectedConversationId()) {
      conversation.id = this.selectedConversationId()!;
    }
    message.conversation = conversation;
    this.messageService.sendMessage(message).subscribe(data => {
      if (data) {
        this.messageService.getByConversationId(data.conversation.id).subscribe(list => {
          this.messageLists = [...list];
          // try {
          //   this.messageContainer()!.nativeElement.scrollTop = 
          //   Math.max(0, this.messageContainer()!.nativeElement.scrollHeight - this.messageContainer()!.nativeElement.offsetHeight);
          //   console.log(this.messageContainer()!.nativeElement.scrollHeight);
          //   console.log(this.messageContainer()!.nativeElement.offsetHeight);
            
          // } catch (error) {
          //   console.log(error);
            
          // }
          this.messageForm()?.resetForm();
          this.messageForm()?.reset();
        });
      }
    });
  }

}
