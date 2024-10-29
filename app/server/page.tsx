import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <section className="flex flex-col itens-start justify-between">
      <p className="text-2xl text-black text-center">Server Page!</p>
      {session?.user ? (
        <div className="flex flex-col items-start p-6 bg-white rounded-lg font-bold text-black">
          Autenticada!
        </div>
      ) : null}
    </section>
  );
}
