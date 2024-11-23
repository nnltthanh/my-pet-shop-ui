import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { User } from "../auth/user.model";

export class Conversation {
    id: number;
    content: string;
    startTime: Date;
    endTime: Date;
    conversation: string;
    sender: User;
    receiver: User;
}

export class Message {
    id: number;
    content: string;
    timeStamp: Date;
    conversation: Conversation;
    sender: User;
}

@Injectable({
    providedIn: 'root'
})
export class ChatMessageService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<Message[]>(this.getBaseUri());
    }

    public sendMessage(message: Message) {
        return this.http.post<Message>(this.getBaseUri(), message);
    }

    public getByConversationId(conversationId: number) {
        return this.http.get<Message[]>(this.getBaseUri() + "/" + conversationId);
    }

    private getBaseUri(): string {
        return `${environment.BACKEND_URL}/messages`;
    }

}