"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../_components/ui/button";
import Link from "next/link";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      /* Autenticar utilizando as credenciais em Auth Options */
      const result = signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result) {
        setError("Falha no Login. Tente novamente.");
      } else {
        result.then((response) => {
          if (response) {
            if (response.status === 401) {
              setError("E-mail ou senha inválidos!");
            } else {
              if (response.error) {
                setError(response.error);
              }
            }
          } else {
            setError("An error occurred. Please try again.");
          }
        });
      }
    } catch (error) {
      setError("Um erro ocorreu durante o login. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-t">
      <div className="bg-[#ffffff] p-5 border-2 text-center w-[370px]">
        <form className="p-5" onSubmit={handleOnSubmit}>
          <div>
            <label className="block mb-2 text-[#000] text-start">E-mail</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] p-2 mb-4 bg-[#fff] text-[#000] font-semibold focus:outline-none border border-solid border-muted-foreground"
              placeholder="John@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-[#000] text-start">Senha</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[100%] p-2 mb-4 bg-[#fff] text-[#000] font-semibold focus:outline-none border border-solid border-muted-foreground"
              placeholder="******"
            />
          </div>
          <p className="block mb-2 font-semibold text-sm text-primary">
            {error}
          </p>
          <Button
            type="submit"
            className="w-[100%] px-3 py-2 border bg-[#4caf50] text-white cursor-pointer text-base transition hover:bg-muted"
          >
            Entrar
          </Button>
          <p className="mt-3 text-[#000]">
            Não possui uma conta?{" "}
            <Link href="/CreateAccount" className="text-[#017156] font-bold">
              Cadastre-se
            </Link>
          </p>
        </form>

        <div className="flex items-center mx-5">
          <hr className="flex grow border-t-2 border-[#ccc]" />
          <span className="py-2 text-[#777] font-bold">ou</span>
          <hr className="flex grow border-t-2 border-[#ccc]" />
        </div>

        <Button
          className="w-[100%] px-3 py-3 bg-transparent mb-3 cursor-pointer border border-solid text-black text-base transition hover:bg-muted"
          onClick={() => signIn("google")}
        >
          <div className="flex flex-row items-center justify-evenly">
            <span className="px-1">
              <svg viewBox="0 0 32 32" width="24" height="24">
                <defs>
                  <path
                    id="A"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="B">
                  <use xlinkHref="#A" />
                </clipPath>
                <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                  <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
                  <path
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                    clipPath="url(#B)"
                    fill="#ea4335"
                  />
                  <path
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                    clipPath="url(#B)"
                    fill="#34a853"
                  />
                  <path
                    d="M48 48L17 24l-4-3 35-10z"
                    clipPath="url(#B)"
                    fill="#4285f4"
                  />
                </g>
              </svg>
            </span>
            <span>Continuar com Google</span>
          </div>
        </Button>

        <Button
          className="w-[100%] px-3 py-3 bg-transparent mb-3 cursor-pointer border border-solid text-black text-base transition hover:bg-muted"
          onClick={() => signIn("github")}
        >
          <div className="flex flex-row items-center justify-evenly">
            <span className="px-1">
              <svg
                width="24"
                height="auto"
                viewBox="0 0 98 96"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  fill="#24292f"
                />
              </svg>
            </span>
            <span>Continuar com Github</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
