"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import UserCard from "../_components/userCard";
import {
  BuildingIcon,
  KeyRoundIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  SquarePlusIcon,
  UserIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Header() {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <nav>
      <ul className="flex justify-between text-2xl text-black font-bold bg-white pt-2">
        <li className="px-5">
          <Link href="/">
            <div className="flex items-center border border-spacing-2 border-muted-foreground rounded-full p-1">
              <KeyRoundIcon />
              <span className="text-sm pl-1">Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/server" title="Server">
            <BuildingIcon size={30} />
          </Link>
        </li>
        <li>
          <Link href="/client" title="Client">
            <UserIcon size={30} />
          </Link>
        </li>
        <li>
          <Link href="/extra" title="Extra">
            <SquarePlusIcon size={30} />
          </Link>
        </li>
        <li>
          <Separator orientation="vertical" className="bg-muted" />
        </li>
        <li>
          {status !== "authenticated" ? (
            <Button
              variant="ghost"
              className="w-full font-semibold justify-center space-x-3 rounded-full text-sm hover:bg-muted"
            >
              Cadastre-se agora
            </Button>
          ) : null}
        </li>
        <li>
          <Sheet>
            <SheetTrigger>
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent>
              {status !== "authenticated" ? (
                <div className="flex items-center justify-between pt-10">
                  <h2 className="font-semibold text-[#000]">Entrar</h2>
                  <SheetClose asChild>
                    <Button
                      className="w-full justify-end space-x-3 rounded-full text-sm font-normal bg-transparent hover:bg-muted"
                      size="icon"
                      asChild
                    >
                      <Link href="/login">
                        <LogInIcon className="text-[#000]" />
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                <>
                  <UserCard user={session?.user} />

                  <div className="py-6">
                    <Separator className="bg-muted-foreground" />
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-muted"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="text-[#000]" />
                    <span className="block text-black">Sair</span>
                  </Button>
                </>
              )}
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}
