"use client";
import BookForm from "../../src/components/books/BookForm";

export default function AddBookPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-zinc-900 rounded shadow">
        <BookForm />
      </div>
    </div>
  );
}
