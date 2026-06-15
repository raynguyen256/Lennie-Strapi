import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function BlogFeaturedCard({ post }) {
  return (
    <section className="bg-white py-14 md:py-16 border-b border-divider">
      <div className="max-w-7xl mx-auto px-6">
        <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-md overflow-hidden border border-divider hover:shadow-md transition-all">
          <div className="h-72 lg:h-auto overflow-hidden relative">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.03] duration-700 transition" />
            <span className="absolute top-5 left-5 bg-brand-blue text-white font-sans text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">★ Nổi bật</span>
          </div>
          <div className="bg-brand-blue-light p-8 md:p-12 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3 font-sans text-[10px] font-bold tracking-[0.14em] text-ink-3 uppercase">
              {post.category && (
                <>
                  <span className="text-brand-blue">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-3"></span>
                </>
              )}
              <span>{post.date}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-[38px] text-ink font-light leading-tight tracking-tight group-hover:text-brand-blue transition-colors">{post.title}</h2>
            <p className="font-sans text-sm text-ink-2 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center gap-3 pt-3 mt-1 border-t border-divider">
              <span className="w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center">
                <Icon.User size={16} />
              </span>
              <div className="font-sans">
                <span className="block text-[12px] font-bold text-ink">{post.author}</span>
                <span className="block text-[10px] text-ink-3">{post.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
