"import React, { useState } from \"react\";
import { Link, useNavigate } from \"react-router-dom\";
import { Search, Heart, ShoppingBag, User, Menu, X } from \"lucide-react\";
import { useCart } from \"@/contexts/CartContext\";
import { useAuth } from \"@/contexts/AuthContext\";

const NAV = [
  { label: \"YENİ SEZON\", to: \"/yeni-sezon\" },
  { label: \"PANTOLON\", to: \"/kategori/pantolon\" },
  { label: \"ELBİSE\", to: \"/kategori/elbise\" },
  { label: \"ETEK\", to: \"/kategori/etek\" },
  { label: \"BLAZER\", to: \"/kategori/blazer\" },
  { label: \"KOLEKSİYON\", to: \"/koleksiyon\" },
];

export default function Header() {
  const { count } = useCart();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState(\"\");
  const nav = useNavigate();

  return (
    <header
      data-testid=\"navbar\"
      className=\"sticky top-0 z-40 backdrop-blur-xl bg-white/85 border-b border-zinc-200\"
    >
      {/* announcement strip */}
      <div className=\"bg-[#111] text-white text-[10px] tracking-[0.3em] uppercase text-center py-2\">
        2500 TL Üzeri Ücretsiz Kargo · 30 Gün İade
      </div>

      <div className=\"max-w-[1600px] mx-auto px-5 sm:px-8\">
        <div className=\"grid grid-cols-3 items-center h-20\">
          {/* left */}
          <div className=\"flex items-center gap-6\">
            <button
              data-testid=\"mobile-menu-btn\"
              className=\"lg:hidden\"
              onClick={() => setMobileOpen(true)}
              aria-label=\"menu\"
            >
              <Menu size={20} strokeWidth={1.25} />
            </button>
            <nav data-testid=\"nav-links\" className=\"hidden lg:flex items-center gap-7\">
              {NAV.slice(0, 3).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  data-testid={`nav-${n.to.replace(/\W/g, \"-\")}`}
                  className=\"text-[11px] tracking-[0.22em] hover:opacity-60 transition\"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* center logo */}
          <Link
            to=\"/\"
            data-testid=\"logo-link\"
            className=\"text-center font-serif text-3xl tracking-[0.35em] select-none\"
            style={{ fontFamily: \"'Cormorant Garamond', serif\", fontWeight: 500 }}
          >
            PANAMA
          </Link>

          {/* right */}
          <div className=\"flex items-center justify-end gap-6\">
            <nav className=\"hidden lg:flex items-center gap-7\">
              {NAV.slice(3).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  data-testid={`nav-${n.to.replace(/\W/g, \"-\")}`}
                  className=\"text-[11px] tracking-[0.22em] hover:opacity-60 transition\"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <button
              data-testid=\"search-toggle\"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label=\"search\"
            >
              <Search size={18} strokeWidth={1.25} />
            </button>
            <Link to=\"/favoriler\" data-testid=\"favorites-icon\" aria-label=\"favorites\">
              <Heart size={18} strokeWidth={1.25} />
            </Link>
            <Link
              to={user ? (user.role === \"admin\" ? \"/admin\" : \"/hesabim\") : \"/giris\"}
              data-testid=\"account-icon\"
              aria-label=\"account\"
            >
              <User size={18} strokeWidth={1.25} />
            </Link>
            <Link to=\"/sepet\" data-testid=\"cart-icon\" aria-label=\"cart\" className=\"relative\">
              <ShoppingBag size={18} strokeWidth={1.25} />
              {count > 0 && (
                <span
                  data-testid=\"cart-count\"
                  className=\"absolute -top-2 -right-3 text-[10px] tracking-wider bg-[#111] text-white w-4 h-4 flex items-center justify-center\"
                >
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form
            data-testid=\"search-form\"
            onSubmit={(e) => {
              e.preventDefault();
              if (q.trim()) nav(`/arama?q=${encodeURIComponent(q)}`);
              setSearchOpen(false);
            }}
            className=\"py-4 border-t border-zinc-200\"
          >
            <input
              autoFocus
              data-testid=\"search-input\"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder=\"Ne aramıştınız?\"
              className=\"underline-input text-base\"
            />
          </form>
        )}
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className=\"fixed inset-0 bg-white z-50 p-6\" data-testid=\"mobile-drawer\">
          <div className=\"flex justify-between items-center mb-10\">
            <span className=\"font-serif text-2xl tracking-[0.3em]\">PANAMA</span>
            <button onClick={() => setMobileOpen(false)} aria-label=\"close\">
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>
          <nav className=\"flex flex-col gap-6\">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className=\"text-sm tracking-[0.25em]\"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
"
