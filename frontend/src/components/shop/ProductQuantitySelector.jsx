export default function ProductQuantitySelector({ qty, onChange }) {
  return (
    <div className="flex items-center border border-divider rounded-sm">
      <button type="button" onClick={() => onChange(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-brand-blue">
        −
      </button>
      <span className="w-12 text-center font-sans font-bold text-ink">{qty}</span>
      <button type="button" onClick={() => onChange(qty + 1)} className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-brand-blue">
        +
      </button>
    </div>
  );
}
