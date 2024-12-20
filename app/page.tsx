"use client";

import Image from "next/image";
import { Button } from "./_components/ui/button";
import { Card, CardContent } from "./_components/ui/card";
import { Separator } from "./_components/ui/separator";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useFcmToken from "@/hooks/useFcmToken";

export default function Home() {
  const { data } = useSession();

  const { token, notificationPermissionStatus } = useFcmToken(
    data?.user?.email ?? null
  );

  const handleTestNotification = async () => {
    await fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/contact",
      }),
    });
  };

  return (
    <>
      {data?.user ? (
        // Welcome Page
        <main className="p-10">
          <div className="flex flex-row items-start p-6 bg-white rounded-lg font-bold text-lg text-black">
            Olá {data?.user?.name}!
          </div>

          <h1 className="text-4xl mb-4 font-bold text-black">
            Firebase Cloud Messaging Demo
          </h1>
          {notificationPermissionStatus === "granted" ? (
            <p>Permission to receive notifications has been granted.</p>
          ) : notificationPermissionStatus !== null ? (
            <p className="text-black">
              You have not granted permission to receive notifications. Please
              enable notifications in your browser settings.
            </p>
          ) : null}

          <Button
            disabled={!token}
            className="mt-5"
            onClick={handleTestNotification}
          >
            Send Test Notification
          </Button>
        </main>
      ) : (
        // Landing Page
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col justify-between p-24 text-black">
              <h1 className="text-lg font-semibold">Bem vindo</h1>
              <h2 className="pt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                nec luctus tortor. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. In ante lacus,
                consequat sed velit ac, lobortis vulputate risus.
              </h2>

              <div className="flex items-center gap-[2px] py-8">
                <Card className="rounded w-auto">
                  <CardContent className="space-y-2 p-5 rounded-lg">
                    <div className="text-center">
                      <span className="text-lg font-semibold text-secondary-foreground text-center">
                        Entrar ou cadastrar-se
                      </span>
                    </div>
                    <Separator className="bg-muted" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-xs text-secondary-foreground py-3">
                        Por favor conecte-se ou crie uma conta para continuar.
                      </span>
                    </div>
                    <Button
                      className="w-full justify-center space-x-3 rounded-full text-sm font-normal bg-green-500"
                      asChild
                    >
                      <Link href="/login">Entrar / Cadastrar</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Image
              src="/login-image.webp"
              alt="Login Image"
              className="dark:invert"
              width={500}
              height={24}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
