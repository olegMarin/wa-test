"use client"

import React from 'react';
import { MessageInterface } from './messagesList';

const MessageBubble: React.FC<MessageInterface> = ({sender, text}) => {
    return (
        <div className={`max-w-md w-3/5 ${sender}`}>
            <b>{sender==='user' ? 'you' : sender}</b>
            <p>{text}</p>
        </div>
    );
};

export default MessageBubble;