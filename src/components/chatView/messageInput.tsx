"use client"

import React, { useState } from 'react';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="footer p-4 flex flex-row w-full">
            <textarea 
                className="p-2"
                style={{flex: 4}}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
            ></textarea>
            <button onClick={handleSend} className="ml-2 w-20" >Send</button>
        </div>
    );
};

export default MessageInput;