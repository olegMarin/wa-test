"use client"

import Login from "@/components/authView/login";
import PhoneInput from "@/components/authView/phoneInput";
import MessagesList from "@/components/chatView/messagesList";
import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const [phone, setPhone] = useState<string>('');
  return (
    <div className=" flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 justify-center w-full min-w-xs max-w-3xl h-screen">
        {!token ?
          
          <Login 
            onSetToken={setToken}
            //тут костыль, потому что мы не авторизуемся на сервере 
            // а сразу передаём idInstance и apiTokenInstance 
            // из интерфейса входа в метод отправки сообщения
            onSetUsername={setUsername} 
            onSetPassword={setPassword}
            />
        :
          !phone ?
            <PhoneInput onSetPhone={setPhone}/>
            :
            <MessagesList 
              idInstance = {username} 
              apiTokenInstance = {password}
              phone = {phone}
              />
        }
       
      </main>
      
    </div>
  );
}
