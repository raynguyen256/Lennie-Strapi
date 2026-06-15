import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group rounded-md overflow-hidden bg-white border border-divider flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="h-56 overflow-hidden relative">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] duration-700 transition" />
        {post.category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-blue font-sans text-[9px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-sm">
            {post.category}
          </span>
        )}
      </div>
      <div className="p-6 space-y-3 flex flex-col flex-1">
        <div className="flex items-center gap-3 font-sans text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">
          <span>{post.date}</span>
          {post.readTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink-3"></span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>
        <h3 className="font-serif text-xl font-bold text-ink leading-snug group-hover:text-brand-blue transition-colors">{post.title}</h3>
        <p className="font-sans text-sm text-ink-2 leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
        <span className="font-sans text-[11px] font-bold tracking-wider text-brand-blue uppercase flex items-center gap-1.5 pt-1">
          Đọc bài viết <Icon.ArrowR size={14} />
        </span>
      </div>
    </Link>
  );
}
