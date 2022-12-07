import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MinimizedUser } from '../model/User';
import { ChatHistory } from '../model/Chat_History';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  minimizedUserContent: BehaviorSubject<MinimizedUser[]> = new BehaviorSubject<MinimizedUser[]>(null);
  messagesContent: BehaviorSubject<ChatHistory[]> = new BehaviorSubject<ChatHistory[]>(null);

  getMinimizedUsers() {
    return this.minimizedUserContent;
  }
  getMessagesList(user_id: number, friend_id: number) {
    return this.messagesContent.pipe(
      map((messages) => {
        return messages.filter((message) => {
          return message.chat_sender.user_id === user_id && message.chat_receiver.user_id === friend_id;
        });
      })
    );
  }
  constructor() {
    this.minimizedUserContent.next([
      {
        user_id: 1,
        name: 'John Doe',
        photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      },
      {
        user_id: 2,
        name: 'Jane Doe',
        photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      },
      {
        user_id: 3,
        name: 'jilani ourari',
        photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      }
    ]);

    this.messagesContent.next([
      {
        chat_id: 1,
        chat_history_type: 'text',
        chat_history_date: new Date(),
        chat_sender: {
          user_id: 1,
          name: 'John Doe',
          photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        chat_receiver: {
          user_id: 2,
          name: 'Jane Doe',
          photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        message: {
          message_id: 1,
          message_type: 'text',
          content: 'Hello',
          message_timing: new Date()
        }
      },
      {
        chat_id: 2,
        chat_history_type: 'text',
        chat_history_date: new Date(),
        chat_sender: {
          user_id: 2,
          name: 'Jane Doe',
          photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        chat_receiver: {
          user_id: 1,
          name: 'John Doe',
          photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        message: {
          message_id: 2,
          message_type: 'text',
          content: 'Hello',
          message_timing: new Date()
        }
      },
      {
        chat_id: 3,
        chat_history_type: 'text',
        chat_history_date: new Date(),
        chat_sender: {
          user_id: 1,
          name: 'Jane Doe',
          photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        chat_receiver: {
          user_id: 2,
          name: 'John Doe',
          photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        message: {
          message_id: 3,
          message_type: 'text',
          content: 'How are you?',
          message_timing: new Date()
        }
      }
    ]);
  }
}
