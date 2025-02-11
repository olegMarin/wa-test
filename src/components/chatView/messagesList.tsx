"use client"

import React, { useState } from 'react';
import MessageBubble from './messageBuble';
import MessageInput from './messageInput';

const API_URL = 'https://7105.api.greenapi.com';

export interface MessageInterface {
    id: number;
    text: string;
    sender: 'user' | 'client';
}

interface MessagesListInterface {
    idInstance: string;
    apiTokenInstance: string;
    phone: string;
}

const MessagesList: React.FC<MessagesListInterface> = ({idInstance, apiTokenInstance, phone}) => {
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    const sendMessageToAPI = async (text: string) => {
        try {
            const response = await fetch(`${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatId: phone + '@c.us',
                    message: text,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            console.log('Message sent:', data);
            const newMessage: MessageInterface = {
                id: data.idMessage,
                text,
                sender: 'user',
            };
            setMessages([...messages, newMessage]);
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const getMessageFromAPI = async () => {
        try {
            const response = await fetch(`${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();
            if(data?.body?.senderData?.chatId === phone + '@c.us'){
                const newMessage: MessageInterface = {
                    id: data?.body?.idMessage,
                    text: data?.body?.messageData?.textMessageData?.textMessage,
                    sender: 'client',
                };
                setMessages([...messages, newMessage]);

                try {
                    const response = await fetch(`${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            receiptId: data.receiptId
                        }),
                    });
        
                    if (!response.ok) {
                        throw new Error('Failed to fetch messages');
                    }
        
                    const dataDeletedMessage = await response.json();
                    console.log(JSON.stringify(dataDeletedMessage));
                } catch (error) {
                    console.error('Error delete messages:', error);
                }

            }
        } catch (error) {
            console.error('Error get messages:', error);
        }
    }

    const handleSendMessage = async (text: string) => {
        await sendMessageToAPI(text);
    };

    React.useEffect(() => {
        const interval = setInterval(getMessageFromAPI, 5000);
        return () => clearInterval(interval);
    }, []);

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