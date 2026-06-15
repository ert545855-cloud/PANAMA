"import React, { useState } from \"react\";
import { Link, useNavigate } from \"react-router-dom\";
import { useAuth } from \"@/contexts/AuthContext\";
import { toast } from \"sonner\";

function formatErr(d) {
  if (!d) return \"Bir hata oluştu.\";
  if (typeof d === \"string\") return d;
  if (Array.isArray(d)) return d.map((e) => e.msg || JSON.stringify(e)).join(\" \");
  return String(d);
}

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState(\"\");
  const [email, setEmail] = useState(\"\");
  const [password, setPassword] = useState(\"\");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(\"\");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(\"\");
    try {
      await register(email, password, name);
      toast.success(\"PANAMA'ya hoşgeldin.\");
      nav(\"/hesabim\");
    } catch (e) {
      setErr(formatErr(e.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className=\"max-w-md mx-auto px-5 py-24\" data-testid=\"register-page\">
      <div className=\"text-[11px] tracking-[0.3em] uppercase text-zinc-500 mb-3 text-center\">Üye Ol</div>
      <h1 className=\"font-serif text-5xl text-center mb-12\">PANAMA Club</h1>
      <form onSubmit={submit} className=\"space-y-6\">
        <Input label=\"Ad Soyad\" value={name} onChange={setName} testid=\"reg-name\" />
        <Input label=\"E-posta\" type=\"email\" value={email} onChange={setEmail} testid=\"reg-email\" />
        <Input label=\"Şifre\" type=\"password\" value={password} onChange={setPassword} testid=\"reg-password\" />
        {err && <div className=\"text-xs text-red-600\">{err}</div>}
        <button data-testid=\"register-submit\" disabled={busy} className=\"w-full py-4 bg-[#111] text-white text-[11px] tracking-[0.3em] uppercase disabled:opacity-50\">
          {busy ? \"Kayıt olunuyor…\" : \"Üye Ol\"}
        </button>
      </form>
      <div className=\"text-center text-sm mt-8 text-zinc-600\">
        Zaten üye misiniz? <Link to=\"/giris\" className=\"underline\">Giriş Yap</Link>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = \"text\", testid }) {
  return (
    <div>
      <div className=\"text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-1\">{label}</div>
      <input data-testid={testid} type={type} required value={value} onChange={(e) => onChange(e.target.value)} className=\"underline-input\" />
    </div>
  );
}
"
