import { Component, inject, OnInit, output } from '@angular/core';
import { ChatMessageService, Conversation } from '../../../../services/chat-message.service';
import { Observable } from 'rxjs';
import { ConversationService } from '../../../../services/conversation.service';
import { AsyncPipe } from '@angular/common';
import { ChatboxItemComponent } from './chatbox-item/chatbox-item.component';

@Component({
  selector: 'app-chatbox-display',
  standalone: true,
  imports: [AsyncPipe, ChatboxItemComponent],
  templateUrl: './chatbox-display.component.html',
  styleUrl: './chatbox-display.component.scss'
})
export class ChatboxDisplayComponent implements OnInit {

  conversationService = inject(ConversationService);

  $conversations: Observable<Conversation[]>;

  selectedConversation = output<Conversation>();

  selectedConversationId: number;

  ngOnInit(): void {
    this.$conversations = this.conversationService.getAll();
  }

}
