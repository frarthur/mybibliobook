"use client";

import IsbnScanner from "./IsbnScanner";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useSession } from "../../lib/useSession";

interface BookFormProps {
  onSuccess?: () => void;
}

export default function BookForm({ onSuccess }: BookFormProps) {
  const { session } = useSession();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [fetchingBook, setFetchingBook] = useState(false);
    // Auto-remplissage via Google Books API quand l'ISBN change
    useEffect(() => {
      const fetchBook = async () => {
        if (!isbn || isbn.length < 8) return;
        setFetchingBook(true);
        try {
          const apiKey = "AIzaSyCxIQq4McymWc8GOJ6fIqVu5bUUuCHZG1c";
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`);
          const data = await res.json();
          if (data.totalItems > 0) {
            const info = data.items[0].volumeInfo;
            setTitle(info.title || "");
            setAuthor((info.authors && info.authors.join(", ")) || "");
            setCoverUrl((info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) || "");
            setDescription(info.description || "");
          }
        } catch (e) {
          // ignore fetch errors
        } finally {
          setFetchingBook(false);
        }
      };
      fetchBook();
      // eslint-disable-next-line
    }, [isbn]);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!session?.user?.id) {
      setError("Utilisateur non connecté");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("books").insert({
      user_id: session.user.id,
      title,
      author,
      isbn,
      cover_url: coverUrl,
      description,
      wishlist
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Livre ajouté !");
      setTitle("");
      setAuthor("");
      setIsbn("");
      setCoverUrl("");
      setDescription("");
      setWishlist(false);
      onSuccess && onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Ajouter un livre</h2>
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
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          className="input input-bordered w-full"
        />
        <IsbnScanner onDetected={setIsbn} />
        {fetchingBook && <span className="text-xs text-gray-500">Recherche Google Books…</span>}
      </div>
      <input
        type="text"
        placeholder="URL de la couverture"
        value={coverUrl}
        onChange={e => setCoverUrl(e.target.value)}
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={wishlist}
          onChange={e => setWishlist(e.target.checked)}
          className="checkbox"
        />
        Ajouter à la wishlist
      </label>
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}
