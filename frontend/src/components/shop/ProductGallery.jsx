export default function ProductGallery({ product }) {
  return (
    <div className="space-y-4">
      <div className="relative bg-brand-blue-light border border-divider rounded-md aspect-square flex items-center justify-center p-12 overflow-hidden">
        {product.badge && (
          <span className={`absolute top-5 left-5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm bg-white border ${product.badge === "Mới" ? "text-brand-teal border-brand-teal/60" : "text-brand-blue border-divider"}`}>
            {product.badge}
          </span>
        )}
        <img src={product.img} alt={product.name} className="h-full w-auto object-contain" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`bg-brand-blue-light border rounded-sm aspect-square flex items-center justify-center p-3 cursor-pointer ${i === 0 ? "border-brand-blue" : "border-divider hover:border-brand-blue/50"}`}>
            <img src={product.img} alt="" className="h-full w-auto object-contain opacity-90" />
          </div>
        ))}
      </div>
    </div>
  );
}
