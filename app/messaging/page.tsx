"use client";

import { useSession } from "next-auth/react";
import useFcmToken from "@/hooks/useFcmToken";
import { Button } from "../_components/ui/button";
import { useState } from "react";

export default function MessagePage() {
  const { data } = useSession();

  const [token, setToken] = useState("");
  const [title, setTitle] = useState("Teste Notificação");
  const [message, setMessage] = useState("Olá Mundo");
  const [link, setLink] = useState("https://localhost:3000");

  const handleNotification = async () => {
    const response = await fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: title,
        message: message,
        link: link,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <section className="flex flex-col itens-start justify-between">
      <p className="text-2xl text-black text-center">Message Page!</p>
      {data?.user ? (
        <>
          <div className="flex flex-col items-center pb-6 bg-white rounded-lg font-bold text-black">
            Autenticada!
          </div>

          <div className="pt-4 font-bold text-black">
            Enviar Notificações via Firebase Cloud Messaging
          </div>

          <form className="p-5" onSubmit={handleNotification}>
            <div>
              <label className="block mb-2 text-[#000] text-start">Token</label>
              <input
                type="token"
                value={token}
                name="token"
                onChange={(e) => setToken(e.target.value)}
                className="w-[100%] p-2 mb-4 bg-[#fff] text-[#000] font-semibold focus:outline-none border border-solid border-muted-foreground"
                placeholder="TOKEN"
              />
            </div>
            <div>
              <label className="block mb-2 text-[#000] text-start">Title</label>
              <input
                type="title"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-[100%] p-2 mb-4 bg-[#fff] text-[#000] font-semibold focus:outline-none border border-solid border-muted-foreground"
                placeholder="TITLE"
              />
            </div>
            <div>
              <label className="block mb-2 text-[#000] text-start">
                Message
              </label>
              <input
                type="message"
                value={message}
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                className="w-[100%] p-2 mb-4 bg-[#fff] text-[#000] font-semibold focus:outline-none border border-solid border-muted-foreground"
                placeholder="MESSAGE"
              />
            </div>
            <div>
              <label className="block mb-2 text-[#000] text-start">Link</label>
              <input
                type="link"
                value={link}
                name="link"
                onChange={(e) => setLink(e.target.value)}
                className="w-[100%] p-2 mb-4 bg-[#fff] text-[#000] font-semibold focus:outline-none border border-solid border-muted-foreground"
                placeholder="LINK"
              />
            </div>

            <Button disabled={!token} className="mt-5">
              Send Test Notification
            </Button>
          </form>
        </>
      ) : null}
    </section>
  );
}
