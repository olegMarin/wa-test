"use client"

import React, { useState } from 'react';
import MessageBubble from './messageBuble';
import MessageInput from './messageInput';

export interface MessageInterface {
    id: number;
    text: string;
    sender: 'user' | 'client';
}

const MessagesList: React.FC = () => {
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    const handleSendMessage = (text: string) => {
        const newMessage: MessageInterface = {
            id: messages.length + 1,
            text,
            sender: 'user',
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="flex flex-col justify-end w-full h-screen">
            <div className="p-4 flex flex-col items-end w-full overflow-y-scroll">
                {messages.map((message) => (
                    <MessageBubble key={message.id} {...message}  />
                ))}
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default MessagesList;