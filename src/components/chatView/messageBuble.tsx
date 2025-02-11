"use client"

import React from 'react';
import './messageBubble.css';
import { MessageInterface } from './messagesList';

const MessageBubble: React.FC<MessageInterface> = ({sender, text}) => {
    return (
        <div className={`message-bubble ${sender} `}>
            <p>{text}</p>
        </div>
    );
};

export default MessageBubble;