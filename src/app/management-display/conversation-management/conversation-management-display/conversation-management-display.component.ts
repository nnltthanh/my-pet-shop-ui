import { Component, inject } from '@angular/core';
import { ChatContentDisplayComponent } from './chat-content-display/chat-content-display.component';
import { ChatboxDisplayComponent } from './chatbox-display/chatbox-display.component';
import { ChatMessageService, Conversation, Message } from '../../../services/chat-message.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-conversation-management-display',
  standalone: true,
  imports: [ChatContentDisplayComponent, ChatboxDisplayComponent, AsyncPipe],
  templateUrl: './conversation-management-display.component.html',
  styleUrl: './conversation-management-display.component.scss'
})
export class ConversationManagementDisplayComponent {

  chatService = inject(ChatMessageService);

  $messages: Observable<Message[]>;

  selectedConversationId: number;

  onSelectedConversation(conversation: Conversation) {
    this.selectedConversationId = conversation?.id;
    this.$messages = this.chatService.getByConversationId(conversation?.id);
  }

}
