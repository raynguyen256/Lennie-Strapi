"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ShopFilters from "@/components/shop/ShopFilters";
import ShopSortBar from "@/components/shop/ShopSortBar";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopPagination from "@/components/shop/ShopPagination";
import ProductQuickViewModal from "@/components/shop/ProductQuickViewModal";
import { PRICE_BANDS } from "@/lib/data";

const PER_PAGE = 6;

export default function ShopCatalog({ products, added, onAdd, onOpenQuiz }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [types, setTypes] = useState([]);
  const [skins, setSkins] = useState([]);
  const [band, setBand] = useState("all");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [quick, setQuick] = useState(null);
  const [query, setQuery] = useState(initialQuery);

  const toggle = (setter, arr) => (v) => {
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const bandTest = PRICE_BANDS.find((b) => b.id === band).test;
    const term = query.trim().toLowerCase();
    let r = products.filter(
      (p) =>
        (types.length === 0 || types.includes(p.type)) &&
        (skins.length === 0 || p.skinTypes.some((s) => skins.includes(s))) &&
        bandTest(p) &&
        (!term || p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term))
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.priceValue - b.priceValue);
    else if (sort === "price-desc") r = [...r].sort((a, b) => b.priceValue - a.priceValue);
    else if (sort === "rating") r = [...r].sort((a, b) => b.reviews - a.reviews);
    return r;
  }, [products, types, skins, band, sort, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);
  const activeCount = types.length + skins.length + (band !== "all" ? 1 : 0);

  const clear = () => {
    setTypes([]);
    setSkins([]);
    setBand("all");
    setPage(1);
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <ShopFilters
          types={types}
          skins={skins}
          band={band}
          onToggleType={toggle(setTypes, types)}
          onToggleSkin={toggle(setSkins, skins)}
          onSelectBand={(id) => {
            setBand(id);
            setPage(1);
          }}
          onClear={clear}
          activeCount={activeCount}
          onOpenQuiz={onOpenQuiz}
        />

        <div className="lg:col-span-9">
          <ShopSortBar count={filtered.length} sort={sort} onSortChange={(v) => setSort(v)} />

          {shown.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-ink mb-2">Không tìm thấy sản phẩm</p>
              <p className="font-sans text-sm text-ink-2 mb-6">Thử bỏ bớt bộ lọc để xem thêm lựa chọn.</p>
              <button type="button" onClick={clear} className="px-6 py-3 bg-brand-blue text-white font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm">
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {shown.map((p) => (
                <ShopProductCard key={p.slug} product={p} added={!!added[p.slug]} onAdd={onAdd} onQuickView={setQuick} />
              ))}
            </div>
          )}

          <ShopPagination page={cur} pages={pages} onChange={setPage} />
        </div>
      </div>

      <ProductQuickViewModal product={quick} onClose={() => setQuick(null)} added={quick ? !!added[quick.slug] : false} onAdd={onAdd} />
    </section>
  );
}
