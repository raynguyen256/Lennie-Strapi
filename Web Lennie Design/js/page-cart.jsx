/* ============================================================
   Giỏ hàng (Cart) — full-page cart review + summary
   ============================================================ */
function CartRow({ item, checked, onToggle, onQty, onRemove }) {
  return (
    <div className="flex gap-4 sm:gap-5 py-6 border-b border-divider">
      <button type="button" onClick={() => onToggle(item.id)} aria-pressed={checked} aria-label="Chọn sản phẩm"
        className={`mt-1 w-5 h-5 shrink-0 rounded-sm border flex items-center justify-center transition-colors ${checked ? 'bg-brand-blue border-brand-blue text-white' : 'border-divider text-transparent hover:border-brand-blue'}`}>
        <Icon.Check size={13} />
      </button>
      <a href={`product-detail.html?id=${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-brand-blue-light border border-divider rounded-sm flex items-center justify-center p-3 overflow-hidden group">
        <img src={item.img} alt={item.name} className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
      </a>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-brand-teal mb-1">{item.brand}</div>
            <a href={`product-detail.html?id=${item.id}`} className="font-serif text-[17px] sm:text-lg font-medium text-ink leading-snug hover:text-brand-blue transition-colors">{item.name}</a>
            <div className="font-sans text-[13px] text-ink-2 mt-1.5">{vnd(item.price)} <span className="text-ink-3">/ sản phẩm</span></div>
          </div>
          <button type="button" onClick={() => onRemove(item.id)} className="shrink-0 inline-flex items-center gap-1 text-ink-3 hover:text-brand-blue font-sans text-[11px] font-bold tracking-wider uppercase p-1"><Icon.X size={15} /><span className="hidden sm:inline">Xóa</span></button>
        </div>
        <div className="flex items-end justify-between gap-3 mt-auto pt-4">
          <div className="flex items-center border border-divider rounded-sm">
            <button type="button" onClick={() => onQty(item.id, item.qty - 1)} className="w-10 h-10 flex items-center justify-center text-ink-2 hover:text-brand-blue">−</button>
            <span className="w-11 text-center font-sans font-bold text-ink">{item.qty}</span>
            <button type="button" onClick={() => onQty(item.id, item.qty + 1)} className="w-10 h-10 flex items-center justify-center text-ink-2 hover:text-brand-blue">+</button>
          </div>
          <span className="font-serif text-xl font-bold text-ink">{vnd(item.price * item.qty)}</span>
        </div>
      </div>
    </div>
  );
}

function CartApp({ api }) {
  const { items, count, setQty, remove, clear, isSelected, toggleSelect, allSelected, selectAll, deselectAll, selectedCount, selectedSubtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue"><Icon.Bag size={34} /></div>
          <h2 className="font-serif text-3xl text-ink font-light">Giỏ hàng của bạn đang trống</h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed max-w-md">Hãy khám phá bộ sưu tập dược mỹ phẩm chọn lọc được ThS. DS. Hoàng Hồng Thắm tuyển chọn và thêm sản phẩm phù hợp với làn da bạn.</p>
          <a href="shop.html" className="mt-2 px-8 py-4 bg-ink text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-brand-blue transition-colors inline-flex items-center gap-2"><Icon.ArrowR size={15} />Khám phá sản phẩm</a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Items */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-between pb-4 border-b border-divider">
            <h2 className="font-serif text-2xl text-ink font-semibold">Sản phẩm <span className="text-ink-3 font-light">({count})</span></h2>
            <button type="button" onClick={clear} className="font-sans text-[10px] font-bold tracking-wider text-ink-3 hover:text-brand-blue uppercase">Xóa tất cả</button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-divider">
            <button type="button" onClick={() => (allSelected ? deselectAll() : selectAll())} className="flex items-center gap-2 font-sans text-[11px] font-bold tracking-wider text-ink-2 hover:text-brand-blue uppercase">
              <span className={`w-4 h-4 rounded-sm border flex items-center justify-center ${allSelected ? 'bg-brand-blue border-brand-blue text-white' : 'border-divider text-transparent'}`}><Icon.Check size={11} /></span>
              Chọn tất cả
            </button>
            <span className="font-sans text-[11px] text-ink-3">{selectedCount}/{count} đã chọn</span>
          </div>
          {items.map((it) => <CartRow key={it.id} item={it} checked={isSelected(it.id)} onToggle={toggleSelect} onQty={setQty} onRemove={remove} />)}
          <a href="shop.html" className="inline-flex items-center gap-2 mt-7 font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-brand-blue hover:text-ink transition-colors"><Icon.ChevronL size={15} />Tiếp tục mua sắm</a>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28 bg-mist border border-divider rounded-md p-6 md:p-7 space-y-5">
            <h3 className="font-serif text-xl font-semibold text-ink">Tóm tắt đơn hàng</h3>
            <div className="space-y-3 font-sans text-sm">
              <div className="flex justify-between text-ink-2"><span>Tạm tính ({selectedCount} sản phẩm)</span><span className="font-semibold text-ink">{vnd(selectedSubtotal)}</span></div>
              <div className="flex justify-between text-ink-2"><span>Phí vận chuyển</span><span className="font-semibold text-brand-blue">Nhân viên xác nhận</span></div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-divider">
              <span className="font-serif text-lg font-semibold text-ink">Tổng tạm tính</span>
              <span className="font-serif text-2xl font-bold text-ink">{vnd(selectedSubtotal)}</span>
            </div>
            {selectedCount > 0 ?
              <a href="checkout.html" className="w-full py-4 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-ink transition-colors flex items-center justify-center gap-2"><Icon.ArrowR size={15} />Tiến hành thanh toán</a> :
              <button type="button" disabled className="w-full py-4 bg-divider text-ink-3 font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 cursor-not-allowed"><Icon.ArrowR size={15} />Tiến hành thanh toán</button>
            }
            <div className="bg-white border border-divider rounded-md p-4 flex items-start gap-3">
              <span className="text-brand-blue shrink-0 mt-0.5"><Icon.HeartHandshake size={18} /></span>
              <p className="font-sans text-[12px] text-ink-2 leading-relaxed">Sau khi đặt hàng, <strong className="text-ink">nhân viên Lennie</strong> sẽ liên hệ để xác nhận đơn và hỗ trợ bạn hoàn tất thanh toán cuối cùng.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[['Shield', 'Chính hãng'], ['Activity', 'Tư vấn da'], ['HeartHandshake', 'Đồng hành']].map(([ic, t]) => {
                const II = Icon[ic];
                return <div key={t} className="flex flex-col items-center text-center gap-1.5"><span className="text-brand-blue"><II size={18} /></span><span className="font-sans text-[9px] font-bold text-ink-2 uppercase tracking-wide">{t}</span></div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CartPage() {
  return (
    <PageShell active="shop">
      {(api) => (
        <>
          <PageHero
            eyebrow="Giỏ hàng"
            title="Giỏ hàng"
            accent="của bạn."
            intro="Kiểm tra lại các sản phẩm dược mỹ phẩm bạn đã chọn trước khi tiến hành thanh toán. Nhân viên Lennie sẽ đồng hành cùng bạn ở bước cuối cùng."
            crumb={[['Sản phẩm', 'shop.html'], ['Giỏ hàng']]}
            img="assets/remix/herb-mix.png"
          />
          <CartApp api={api} />
        </>
      )}
    </PageShell>
  );
}

if (!window.__SPA) ReactDOM.createRoot(document.getElementById('root')).render(<CartPage />);
