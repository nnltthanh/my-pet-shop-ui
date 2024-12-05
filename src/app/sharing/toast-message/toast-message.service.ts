import {Injectable} from '@angular/core';
import {Message} from "./message.model";

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  messages: Message[] = [];

  addSuccessfulMessage(message: string) {
    this.addMessage(Message.createSuccessfulMessage(message));
  }

  addSimpleErrorMessage(message: string) {
    this.addMessage(Message.createSimpleErrorMessage(message));
  }

  addSimpleInfoMessage(message: string) {
    this.addMessage(Message.createSimpleInfoMessage(message));
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  clear(message: Message) {
    this.messages = this.messages.filter(m => m != message);
  }

  clearAll() {
    this.messages = [];
  }
}
