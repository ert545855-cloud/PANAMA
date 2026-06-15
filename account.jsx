"import React from \"react\";
import { Link, useNavigate } from \"react-router-dom\";
import { useAuth } from \"@/contexts/AuthContext\";

export default function Account() {
  const { user, logout, loading } = useAuth();
  const nav = useNavigate();

  if (loading) return <div className=\"text-center py-32 text-sm text-zinc-500\">Yükleniyor…</div>;
  if (!user) {
    return (
      <div className=\"max-w-md mx-auto py-32 text-center\">
        <h1 className=\"font-serif text-4xl mb-6\">Hesabınıza giriş yapın</h1>
        <Link to=\"/giris\" className=\"px-9 py-4 bg-[#111] text-white text-[11px] tracking-[0.3em] uppercase\">Giriş Yap</Link>
      </div>
    );
  }

  return (
    <div className=\"max-w-[1200px] mx-auto px-5 sm:px-8 py-12\" data-testid=\"account-page\">
      <div className=\"border-b border-zinc-200 pb-8 mb-12\">
        <div className=\"text-[11px] tracking-[0.3em] uppercase text-zinc-500 mb-3\">PANAMA Club</div>
        <h1 className=\"font-serif text-5xl\">Merhaba, {user.name}.</h1>
      </div>
      <div className=\"grid grid-cols-1 md:grid-cols-3 gap-10\">
        <Card title=\"Hesap Bilgileri\">
          <div className=\"text-sm text-zinc-600\">
            <div>{user.name}</div>
            <div className=\"mt-1\">{user.email}</div>
            <div className=\"mt-1 capitalize\">{user.role}</div>
          </div>
        </Card>
        <Card title=\"Siparişlerim\">
          <div className=\"text-sm text-zinc-500\">Henüz siparişiniz bulunmuyor.</div>
        </Card>
        <Card title=\"Favoriler\">
          <Link to=\"/koleksiyon\" className=\"text-sm underline\">Koleksiyona Göz At</Link>
        </Card>
      </div>
      <button data-testid=\"logout-button\" onClick={async () => { await logout(); nav(\"/\"); }} className=\"mt-12 px-8 py-3 border border-[#111] text-[11px] tracking-[0.3em] uppercase hover:bg-[#111] hover:text-white\">
        Çıkış Yap
      </button>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className=\"border-t border-zinc-200 pt-6\">
      <div className=\"text-[11px] tracking-[0.25em] uppercase mb-4\">{title}</div>
      {children}
    </div>
  );
}
"
