/* ============================================================
   Lennie SkinLab — shared theme (Tailwind config + global styles)
   Loaded right after the Tailwind Play CDN on every page.
   ============================================================ */
window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Spectral', 'Georgia', 'serif'],
      },
      colors: {
        'brand-blue': '#5789B7',
        'brand-teal': '#87C1E9',
        'brand-blue-light': '#F0F6FC',
        mist: '#F4F9FD',
        'light-bg': '#EAF2FA',
        'teal-soft': '#EEF6FC',
        ink: '#2C4A6F',
        'ink-2': '#486A91',
        'ink-3': '#7EA6CE',
        divider: '#DCEAF5',
      },
    },
  },
};

document.head.insertAdjacentHTML('beforeend', `<style>
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  ::selection { background: rgba(87,137,183,.2); }
  [id] { scroll-margin-top: 116px; }

  /* ── Softer buttons (Homepage v2 final choice) ───────────────
     Scoped to clickable elements only — gentler fills + hover.
     Decorative spans/divs keep the crisp accent blue. */
  button.bg-brand-blue, a.bg-brand-blue,
  button.bg-ink, a.bg-ink {
    background-color: #6E9BC4 !important;
  }
  button.bg-brand-blue:hover, a.bg-brand-blue:hover,
  button.bg-ink:hover, a.bg-ink:hover,
  .hover\:bg-ink:hover,
  .hover\:bg-brand-blue:hover {
    background-color: #5E8BB6 !important;
  }
  .focus\:ring-brand-blue:focus { --tw-ring-color: #9CBEDD !important; }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .dragging { scroll-behavior: auto; }

  @keyframes kenburns { 0% { transform: scale(1.05); } 100% { transform: scale(1.12); } }
  .hero-kenburns { animation: kenburns 18s ease-out forwards; }

  .reveal { opacity: 0; transform: translateY(22px); animation: heroReveal .9s cubic-bezier(.16,1,.3,1) forwards; }
  .reveal-1 { animation-delay: .15s; } .reveal-2 { animation-delay: .30s; }
  .reveal-3 { animation-delay: .45s; } .reveal-4 { animation-delay: .60s; } .reveal-5 { animation-delay: .75s; }
  @keyframes heroReveal { to { opacity: 1; transform: translateY(0); } }

  .reveal-card { opacity: 0; transform: translateY(34px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .reveal-card.is-in { opacity: 1; transform: translateY(0); }
  .reveal-x-l { opacity: 0; transform: translateX(-50px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
  .reveal-x-l.is-in { opacity: 1; transform: translateX(0); }
  .reveal-x-r { opacity: 0; transform: translateX(50px); transition: opacity .9s cubic-bezier(.16,1,.3,1) .1s, transform .9s cubic-bezier(.16,1,.3,1) .1s; }
  .reveal-x-r.is-in { opacity: 1; transform: translateX(0); }

  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee { display: flex; width: max-content; animation: marquee 40s linear infinite; }
  .marquee:hover { animation-play-state: paused; }
  .marquee-slow { display: flex; width: max-content; animation: marquee 55s linear infinite; }
  .marquee-slow:hover { animation-play-state: paused; }

  .flip-card { perspective: 1200px; }
  .flip-inner { transition: transform .6s cubic-bezier(.4,0,.2,1); transform-style: preserve-3d; }
  .flip-card:hover .flip-inner { transform: rotateY(180deg); }
  .flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
  .flip-back { transform: rotateY(180deg); }

  .modal-fade { animation: modalFade .25s ease forwards; }
  @keyframes modalFade { from { opacity: 0; } to { opacity: 1; } }
  .modal-pop { animation: modalPop .35s cubic-bezier(.16,1,.3,1) forwards; }
  @keyframes modalPop { from { opacity: 0; transform: translateY(18px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal-card, .reveal-x-l, .reveal-x-r { opacity: 1 !important; transform: none !important; animation: none !important; }
    .hero-kenburns, .marquee, .marquee-slow { animation: none !important; }
  }
</style>`);
