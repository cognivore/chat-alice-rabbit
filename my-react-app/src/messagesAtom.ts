import { atom } from 'jotai';
import type { WritableAtom } from 'jotai';

export interface Message {
    id: string, // Shouldn't be a string, nor should it be generated from Date! Collisions!
    sender: string, // Probably shouldn't be a string, but for a prototype it's ok.
    content: string, // Now this is a string.
    timestamp: string // Timestamps are certainly not strings! That said, datetime in typescript is a tad sad.
}

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

export const mkAtomGS =
    (mutMessages: { current: Message[] }, localStorageKey: string) => atomMultiplex(
        // get
        () => {
            const ms = (JSON.parse(localStorage.getItem(localStorageKey) || "[]") as Message[])
            mutMessages.current = ms;
            return ms;
        },
        // set
        (updatedMessages: Message[]) => {
            localStorage.setItem(localStorageKey, JSON.stringify(updatedMessages));
            mutMessages.current = updatedMessages;
        });

