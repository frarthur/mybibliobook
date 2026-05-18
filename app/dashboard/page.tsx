"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "../../src/lib/useSession";
import LogoutButton from "../../src/components/LogoutButton";

export default function DashboardPage() {
  const { session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [session, loading, router]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold">Bienvenue sur le dashboard !</h1>
        <p className="mb-4">Vous êtes connecté avec {session.user.email}</p>
        <LogoutButton />
      </div>
    </div>
  );
}
