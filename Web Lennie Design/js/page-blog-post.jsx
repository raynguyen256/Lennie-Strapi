/* ============================================================
   Chi tiết bài viết (Blog single) — reads ?id=
   Body is sample editorial content (client to replace).
   ============================================================ */
function getPost() {
  const id = (window.__SPA && window.__routeId) || new URLSearchParams(location.search).get('id');
  return blogPosts.find((p) => p.id === id) || blogPosts[0];
}

function BlogPostPage() {
  const p = getPost();
  const more = blogPosts.filter((x) => x.id !== p.id).slice(0, 3);
  return (
    <PageShell active="blog">
      {(api) => (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden bg-[#152639] border-b border-divider">
            <div className="absolute inset-0">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-40 select-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d2e]/95 via-[#0f1d2e]/70 to-[#0f1d2e]/60"></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-36 md:pt-44 pb-16 text-center">
              <nav className="flex items-center justify-center gap-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-white/55 mb-6">
                <a href="index.html" className="hover:text-white">Trang chủ</a><Icon.ChevronR size={11} />
                <a href="blog.html" className="hover:text-white">Blog</a>
              </nav>
              <span className="inline-block font-sans text-[10px] font-extrabold tracking-[0.25em] text-brand-teal bg-white/10 px-3 py-1.5 rounded-sm uppercase">{p.category}</span>
              <h1 className="font-serif text-[32px] md:text-[48px] font-light text-white leading-[1.1] tracking-tight mt-5">{p.title}</h1>
              <div className="flex items-center justify-center gap-3 mt-7 text-white/80 font-sans text-[12px]">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"><Icon.User size={15} /></span>
                <span className="font-bold">{p.author}</span><span className="w-1 h-1 rounded-full bg-white/50"></span>
                <span>{p.date}</span><span className="w-1 h-1 rounded-full bg-white/50"></span><span>{p.readTime}</span>
              </div>
            </div>
          </section>

          {/* Article */}
          <section className="bg-white py-14 md:py-20">
            <div className="max-w-3xl mx-auto px-6">
              <p className="font-serif text-xl md:text-2xl text-ink font-light leading-relaxed italic mb-10">{p.excerpt}</p>

              <article className="space-y-6 font-sans text-[15px] text-ink-2 leading-[1.85]">
                <p>Tại Lennie SkinLab, chúng tôi tin rằng hiểu đúng về làn da là bước đầu tiên của mọi hành trình phục hồi. Không có một công thức chung cho tất cả — nhưng có những nguyên tắc khoa học nền tảng mà ai cũng nên nắm rõ trước khi bắt đầu chăm sóc da.</p>

                <h2 className="font-serif text-2xl font-bold text-ink !mt-12">Bắt đầu từ hàng rào bảo vệ da</h2>
                <p>Hàng rào bảo vệ (skin barrier) là lớp ngoài cùng giữ ẩm và ngăn tác nhân gây hại. Khi hàng rào này khỏe mạnh, da giữ nước tốt, ít kích ứng và phục hồi nhanh. Ngược lại, một hàng rào tổn thương khiến da mất nước xuyên biểu bì, dễ mẩn đỏ và nhạy cảm với mọi hoạt chất.</p>
                <p>Đây là lý do mọi phác đồ tại Lennie luôn ưu tiên đánh giá và củng cố hàng rào bảo vệ trước, thay vì vội vàng dùng các hoạt chất mạnh để "ép" da thay đổi.</p>

                <figure className="!my-10 rounded-md overflow-hidden border border-divider">
                  <img src={p.img} alt="" className="w-full h-72 object-cover" />
                  <figcaption className="bg-brand-blue-light px-5 py-3 font-sans text-xs text-ink-3 italic">Hình ảnh minh họa — client cập nhật ảnh thực tế sau.</figcaption>
                </figure>

                <h2 className="font-serif text-2xl font-bold text-ink !mt-12">Cá nhân hóa thay vì sao chép</h2>
                <p>Một routine hiệu quả với người khác chưa chắc phù hợp với bạn. Loại da, cơ địa, khí hậu, thói quen sinh hoạt và cả lịch sử sử dụng sản phẩm đều ảnh hưởng đến cách da phản ứng. Việc sao chép routine của người khác đôi khi khiến tình trạng da trở nên tệ hơn.</p>

                <div className="!my-8 bg-brand-blue-light border-l-4 border-brand-blue rounded-r-md p-6">
                  <p className="font-sans text-[15px] text-brand-blue font-medium italic leading-relaxed">"Chăm da là một hành trình dài. Điều quan trọng nhất là đồng hành đúng cách ngay từ đầu — đọc vị làn da trước, rồi mới đề xuất phác đồ."</p>
                  <span className="block font-sans text-[11px] font-bold text-ink uppercase tracking-wider mt-3">— ThS. DS. Hoàng Hồng Thắm</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-ink !mt-12">Những nguyên tắc nên ghi nhớ</h2>
                <ul className="space-y-3">
                  {['Làm sạch dịu nhẹ, tránh tẩy rửa quá mức làm tổn thương hàng rào bảo vệ.', 'Cấp ẩm đầy đủ là nền tảng cho mọi loại da, kể cả da dầu.', 'Giới thiệu hoạt chất mới từ từ, từng bước, để da kịp thích nghi.', 'Chống nắng mỗi ngày — bước quan trọng nhất để duy trì kết quả.'].map((t, i) => (
                    <li key={i} className="flex gap-3"><span className="text-brand-blue mt-1 shrink-0"><Icon.CheckCircle size={16} /></span><span>{t}</span></li>
                  ))}
                </ul>

                <p className="!mt-8">Nếu bạn chưa chắc nên bắt đầu từ đâu, đừng ngần ngại để Lennie đọc vị làn da và thiết kế một phác đồ phù hợp với riêng bạn. Một khởi đầu đúng sẽ tiết kiệm cho bạn rất nhiều thời gian và chi phí về sau.</p>
                <p className="font-sans text-[11px] text-ink-3 italic">⚠ Nội dung bài viết là bản mẫu để minh họa bố cục — client sẽ thay bằng nội dung biên tập chính thức.</p>
              </article>

              {/* Author + share */}
              <div className="mt-12 pt-8 border-t border-divider flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center"><Icon.User size={20} /></span>
                  <div className="font-sans"><span className="block text-sm font-bold text-ink">{p.author}</span><span className="block text-[11px] text-ink-3">Đội ngũ chuyên môn Lennie SkinLab</span></div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-sans text-[10px] font-bold tracking-wider text-ink-3 uppercase">Chia sẻ</span>
                  {['Fb', 'Ig', 'Zl'].map((s) => <span key={s} className="w-9 h-9 rounded-full bg-brand-blue-light hover:bg-brand-blue hover:text-white border border-divider flex items-center justify-center text-[11px] font-bold uppercase text-brand-blue cursor-pointer transition-colors select-none">{s}</span>)}
                </div>
              </div>
            </div>
          </section>

          {/* More posts */}
          <section className="bg-brand-blue-light py-20 border-y border-divider">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <SectionHead eyebrow="Đọc tiếp" title="Bài viết" accent="liên quan" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {more.map((m) => (
                  <a key={m.id} href={`blog-post.html?id=${m.id}`} className="group bg-white rounded-md overflow-hidden border border-divider flex flex-col hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="h-44 overflow-hidden"><img src={m.img} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 duration-700 transition" /></div>
                    <div className="p-5 space-y-2">
                      <span className="font-sans text-[9px] font-bold tracking-[0.16em] text-brand-blue uppercase">{m.category}</span>
                      <h4 className="font-serif text-lg font-bold text-ink leading-snug group-hover:text-brand-blue transition-colors">{m.title}</h4>
                      <span className="font-sans text-[10px] text-ink-3 uppercase tracking-wide">{m.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
          <ConsultSection
            id="dang-ky"
            eyebrow="Đăng ký tư vấn"
            title="Cần Lennie đọc vị"
            accent="làn da của bạn?"
            intro="Để lại thông tin và tình trạng da — đội ngũ chuyên môn sẽ tiếp tục tư vấn trực tiếp cùng bạn qua Messenger."
            image="assets/remix/clinic-treatment.png"
          />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<BlogPostPage />);
