"use client";

import WishlistBooks from "../../src/components/books/WishlistBooks";

export default function WishlistPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-zinc-900 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Ma wishlist</h1>
        <WishlistBooks />
      </div>
    </div>
  );
}
