"use client";
import BookList from "../../../src/components/books/BookList";

export default function LibraryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-zinc-900 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Ma bibliothèque</h1>
        <BookList />
      </div>
    </div>
  );
}
