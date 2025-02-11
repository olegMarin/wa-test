"use client"

import Login from "@/components/authView/login";
import PhoneInput from "@/components/authView/phoneInput";
import MessagesList from "@/components/chatView/messagesList";
import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!token ?
          
          <Login onSetToken={setToken}/>
        :
          !phone ?
            <PhoneInput onSetPhone={setPhone}/>
            :
            <MessagesList/>
        }
       
      </main>
      
    </div>
  );
}
