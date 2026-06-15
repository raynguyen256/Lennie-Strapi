"use client";

import { useState } from "react";
import BlogCategoryFilters from "@/components/blog/BlogCategoryFilters";
import BlogCard from "@/components/blog/BlogCard";
import { blogCategories } from "@/lib/data";

export default function BlogList({ posts }) {
  const [cat, setCat] = useState("Tất cả");
  const list = cat === "Tất cả" ? posts : posts.filter((p) => p.category === cat);

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <BlogCategoryFilters categories={blogCategories} active={cat} onSelect={setCat} />
        {list.length === 0 ? (
          <p className="text-center font-sans text-sm text-ink-2 py-16">Chưa có bài viết trong chuyên mục này.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {list.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
