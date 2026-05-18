"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface WishlistBook {
  id: number;
  title: string;
  author: string;
  created_at?: string;
}

type SortKey = "title" | "author" | "created_at";
type SortOrder = "asc" | "desc";

export default function WishlistList() {
  const [books, setBooks] = useState<WishlistBook[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    let query = supabase.from("wishlist").select("*", { count: "exact" });
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }
    const { data, error } = await query;
    if (!error && data) {
      setBooks(data);
    }
    setLoading(false);
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortKey] || "";
      let bValue = b[sortKey] || "";
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Rechercher par titre ou auteur..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input input-bordered w-full sm:w-64"
        />
        <button onClick={fetchBooks} className="btn btn-outline">Rafraîchir</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={() => handleSort("title")}>Titre {sortKey === "title" && (sortOrder === "asc" ? "▲" : "▼")}</th>
              <th className="cursor-pointer" onClick={() => handleSort("author")}>Auteur {sortKey === "author" && (sortOrder === "asc" ? "▲" : "▼")}</th>
              <th className="cursor-pointer" onClick={() => handleSort("created_at")}>Ajouté {sortKey === "created_at" && (sortOrder === "asc" ? "▲" : "▼")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="text-center">Chargement...</td></tr>
            ) : filteredBooks.length === 0 ? (
              <tr><td colSpan={3} className="text-center">Aucun livre trouvé</td></tr>
            ) : (
              filteredBooks.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.created_at ? new Date(book.created_at).toLocaleDateString() : ""}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
