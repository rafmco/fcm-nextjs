import { getServerSession } from "next-auth";
// Remember you must use an AuthProvider for
// client components to useSession
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function ClientPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/client");
  }

  return (
    <section className="flex flex-col itens-start justify-between">
      <p className="text-2xl text-black text-center">Client Page!</p>
      {session?.user ? (
        <div className="flex flex-col items-start p-6 bg-white rounded-lg font-bold text-black">
          Autenticada!
        </div>
      ) : null}
    </section>
  );
}
