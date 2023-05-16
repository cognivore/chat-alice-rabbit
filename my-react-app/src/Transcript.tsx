import React from 'react';

// It was meant to be a pure HTML / JS, not a react component, to show an interop.
const Transcript: React.FC = () => {
    const storedMessages = localStorage.getItem('messages');
    const messages = storedMessages ? JSON.parse(storedMessages) : [];

    const transcriptText = messages
        .map((message: { sender: string; content: string }) => `${message.sender}: ${message.content}`)
        .join('\n');

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <pre className="bg-white p-4 rounded-lg shadow-md whitespace-pre-wrap">{transcriptText}</pre>
        </div>
    );
};

export default Transcript;
