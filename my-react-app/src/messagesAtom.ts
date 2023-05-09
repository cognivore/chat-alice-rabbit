
import { atom } from 'jotai';

export interface Message {
  id: string;
  sender: string;
  content: string;
}

const storedMessages: Message[] = JSON.parse(localStorage.getItem('messages') || '[]');

export const messagesAtom = atom<Message[]>(storedMessages);
