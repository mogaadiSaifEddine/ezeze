import { MinimizedUser } from './User';
import { ChatMessage } from './Chat_Message';

export interface ChatHistory {
  chat_id: number;
  chat_history_type: string;
  chat_history_date: Date;
  chat_sender: MinimizedUser;
  chat_receiver: MinimizedUser;
  message: ChatMessage;
}
