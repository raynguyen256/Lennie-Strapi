/* ============================================================
   Blog — danh sách bài viết kiến thức da liễu
   ============================================================ */
function BlogCard({ p }) {
  return (
    <a href={`blog-post.html?id=${p.id}`} className="group rounded-md overflow-hidden bg-white border border-divider flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="h-56 overflow-hidden relative">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] duration-700 transition" />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-blue font-sans text-[9px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-sm">{p.category}</span>
      </div>
      <div className="p-6 space-y-3 flex flex-col flex-1">
        <div className="flex items-center gap-3 font-sans text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">
          <span>{p.date}</span><span className="w-1 h-1 rounded-full bg-ink-3"></span><span>{p.readTime}</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-ink leading-snug group-hover:text-brand-blue transition-colors">{p.title}</h3>
        <p className="font-sans text-sm text-ink-2 leading-relaxed flex-1">{p.excerpt}</p>
        <span className="font-sans text-[11px] font-bold tracking-wider text-brand-blue uppercase flex items-center gap-1.5 pt-1">Đọc bài viết <Icon.ArrowR size={14} /></span>
      </div>
    </a>
  );
}

function BlogApp() {
  const { useState } = React;
  const [cat, setCat] = useState('Tất cả');
  const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
  const rest = blogPosts.filter((p) => p.id !== featured.id);
  const list = cat === 'Tất cả' ? rest : rest.filter((p) => p.category === cat);

  return (
    <>
      {/* Featured */}
      <section className="bg-white py-14 md:py-16 border-b border-divider">
        <div className="max-w-7xl mx-auto px-6">
          <a href={`blog-post.html?id=${featured.id}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-md overflow-hidden border border-divider hover:shadow-md transition-all">
            <div className="h-72 lg:h-auto overflow-hidden relative">
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.03] duration-700 transition" />
              <span className="absolute top-5 left-5 bg-brand-blue text-white font-sans text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">★ Nổi bật</span>
            </div>
            <div className="bg-brand-blue-light p-8 md:p-12 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3 font-sans text-[10px] font-bold tracking-[0.14em] text-ink-3 uppercase">
                <span className="text-brand-blue">{featured.category}</span><span className="w-1 h-1 rounded-full bg-ink-3"></span><span>{featured.date}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[38px] text-ink font-light leading-tight tracking-tight group-hover:text-brand-blue transition-colors">{featured.title}</h2>
              <p className="font-sans text-sm text-ink-2 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-3 pt-3 mt-1 border-t border-divider">
                <span className="w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center"><Icon.User size={16} /></span>
                <div className="font-sans"><span className="block text-[12px] font-bold text-ink">{featured.author}</span><span className="block text-[10px] text-ink-3">{featured.readTime}</span></div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="bg-white py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {blogCategories.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} className={`px-4 py-2 text-[10px] font-bold tracking-[0.12em] uppercase rounded-full border transition-all ${cat === c ? 'border-brand-blue bg-brand-blue text-white shadow-sm' : 'border-divider bg-white text-ink-2 hover:border-brand-blue'}`}>{c}</button>
            ))}
          </div>
          {list.length === 0 ? (
            <p className="text-center font-sans text-sm text-ink-2 py-16">Chưa có bài viết trong chuyên mục này.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {list.map((p) => <BlogCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function BlogPage() {
  return (
    <PageShell active="blog">
      {(api) => (
        <>
          <PageHero
            eyebrow="Blog · Kiến thức da liễu"
            title="Đọc để hiểu"
            accent="làn da của mình."
            intro="Kiến thức chăm da khoa học, phân tích hoạt chất và những câu chuyện phục hồi thật — chia sẻ bởi đội ngũ chuyên môn Lennie SkinLab."
            crumb={[['Blog']]}
            img="assets/remix/wellness-spa.png"
          />
          <BlogApp />
          <CTABand onOpenBooking={() => api.openBooking()} secondaryHref="services.html" secondary="Xem dịch vụ" title="Muốn được tư vấn riêng cho da bạn?" accent="Đừng chỉ đọc — hãy bắt đầu." text="Kiến thức là khởi đầu. Đặt lịch đọc vị làn da hoặc làm phân tích da miễn phí để có phác đồ phù hợp với chính bạn." />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<BlogPage />);
