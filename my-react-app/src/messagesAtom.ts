import { atom } from 'jotai';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const storedMessages = localStorage.getItem('messages');
const initialMessages: Message[] = storedMessages ? JSON.parse(storedMessages) : [];

export const messagesAtom = atom<Message[]>(initialMessages);
