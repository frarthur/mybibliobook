"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface WishlistFormProps {
  onSuccess?: () => void;
}

export default function WishlistForm({ onSuccess }: WishlistFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.from("wishlist").insert({ title, author });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Ajouté à la wishlist !");
      setTitle("");
      setAuthor("");
      onSuccess && onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Ajouter à la wishlist</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Auteur"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}
