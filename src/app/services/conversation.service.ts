import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { User } from "../auth/user.model";
import { Conversation } from "./chat-message.service";

@Injectable({
    providedIn: 'root'
})
export class ConversationService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<Conversation[]>(this.getBaseUri());
    }

    public getByConversationId(conversationId: number) {
        return this.http.get<Conversation>(this.getBaseUri() + "/" + conversationId);
    }

    private getBaseUri(): string {
        return `${environment.BACKEND_URL}/conversations`;
    }

}