import React, { useState } from 'react';
import { atom, useAtom } from 'jotai';
import type { WritableAtom } from 'jotai';
import { messagesAtom } from './messagesAtom';

export function atomMultiplex<Y>(getVar: (() => Y), setVar: ((_: Y) => void))
    : WritableAtom<Y, unknown[], unknown> {
    const baseAtom = atom(getVar());

    return atom(
        (get) => get(baseAtom),
        (get, set, update) => {
            const newValue = typeof update === 'function' ? (update as Function)(get(baseAtom)) : update;
            set(baseAtom, newValue);
            setVar(newValue);
        }
    );
}

interface Message {
    id: string, // Shouldn't be a string, nor should it be generated from Date! Collisions!
    sender: string, // Probably shouldn't be a string, but for a prototype it's ok.
    content: string, // Now this is a string.
    timestamp: string // Timestamps are certainly not strings! That said, datetime in typescript is a tad sad.
}

const messages: { current: Message[] } = { current: [] };

const atomGS = atomMultiplex(
    () => (JSON.parse(localStorage.getItem('messages') || "[]") as Message[]), (updatedMessages: Message[]) => {
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        messages.current = updatedMessages;
    });

interface ChatAppProps {
    title: string;
    sender: string;
}

const ChatApp: React.FC<ChatAppProps> = ({ title, sender }) => {
    const [messages, setMessages] = useAtom(messagesAtom);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue) {
            const timestamp = new Date().toLocaleString();
            const newMessage = {
                id: Date.now().toString(),
                sender,
                content: inputValue,
                timestamp,
            };
            const updatedMessages = [...messages, newMessage];
            // Okay, but you use Jotai, which has localStorage backend.
            // Doing it the way is done here is the easiest way to end up writing bugs.
            setMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            setInputValue('');
        }
    };

    const clearChat = () => {
        setMessages([]);
        localStorage.setItem('messages', JSON.stringify([]));
    };

    return (
        <section className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg mx-auto">
                <h1 className="text-3xl font-bold mb-4 font-serif">{title}</h1>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="space-y-2 h-96 overflow-y-auto">
                        {messages.map((message) => (
                            <div key={message.id}>
                                <div className="text-sm font-medium text-gray-900">{message.sender}:</div>
                                <div className="text-sm text-gray-600">{message.content}</div>
                                <div className="text-xs text-gray-400">{message.timestamp}</div>
                            </div>
                        ))}
                    </div>
                    <form className="mt-4" onSubmit={handleFormSubmit}>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Type your message here..."
                                value={inputValue}
                                onChange={handleInputChange}
                                className="flex-1 py-2 px-3 border rounded-lg text-sm"
                                style={{ height: "40px" }}
                            />
                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={clearChat}
                        className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Clear the chat
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChatApp;

