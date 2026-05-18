
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-zinc-900 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Bienvenue sur MyBiblioBook</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">Gérez vos livres et notes facilement.</p>
        <div className="flex flex-col gap-4">
          <Link href="/login" className="btn btn-primary w-full">Connexion</Link>
          <Link href="/register" className="btn btn-outline w-full">Inscription</Link>
        </div>
      </div>
    </div>
  );
}
