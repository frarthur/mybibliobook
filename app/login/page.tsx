"use client";
import { useState } from "react";
import LoginForm from "../../src/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <LoginForm onError={setError} />
        <p className="text-center text-sm">
          Pas de compte ? <Link href="/register" className="text-blue-600 hover:underline">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
