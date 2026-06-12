/* ============================================================
   Lennie SkinLab — single-file SPA router (offline build only)
   Hash routing + global link interception so every existing
   <a href="*.html"> keeps working without a server.
   ============================================================ */
(function () {
  const ROUTES = {
    index: 'AppB', home: 'AppB', '': 'AppB',
    about: 'AboutPage',
    services: 'ServicesPage',
    'service-detail': 'ServiceDetailPage',
    shop: 'ShopPage',
    'product-detail': 'ProductPage',
    blog: 'BlogPage',
    'blog-post': 'BlogPostPage',
    contact: 'ContactPage',
    booking: 'BookingPage',
    testimonials: 'TestimonialsPage',
  };

  let root = null;

  function parseHash() {
    const h = location.hash || '';
    let name = 'index', query = '';
    if (h.indexOf('#/') === 0) {
      const rest = h.slice(2);
      const qi = rest.indexOf('?');
      if (qi >= 0) { name = rest.slice(0, qi); query = rest.slice(qi + 1); }
      else { name = rest; }
    }
    return { name: name || 'index', query };
  }

  function render() {
    const { name, query } = parseHash();
    window.__routeId = new URLSearchParams(query).get('id') || null;
    const compName = ROUTES[name] || ROUTES.index;
    const C = (typeof window[compName] === 'function') ? window[compName] : null;
    const Use = C || ((typeof window.AppB === 'function') ? window.AppB : null);
    if (!Use) return;
    if (!root) root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(Use));
    window.scrollTo(0, 0);
  }

  // Intercept clicks on internal *.html links → hash routes
  document.addEventListener('click', function (e) {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (/^(https?:|mailto:|tel:|#)/i.test(href)) return; // external or in-page anchor
    const m = href.match(/^([\w-]+)\.html(?:\?(.*))?$/);
    if (!m) return;
    e.preventDefault();
    const name = m[1];
    const q = m[2] || '';
    const target = '#/' + name + (q ? ('?' + q) : '');
    if (location.hash === target) render(); // same route → force refresh
    else location.hash = target;
  });

  window.addEventListener('hashchange', render);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
