"use client";
import { useState } from "react";
import RegisterForm from "../../src/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Inscription</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <RegisterForm onError={setError} />
        <p className="text-center text-sm">
          Déjà un compte ? <Link href="/login" className="text-blue-600 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
