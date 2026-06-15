"import React, { useEffect, useState } from \"react\";
import { useNavigate, useParams } from \"react-router-dom\";
import { api, formatPrice } from \"@/lib/api\";
import { useCart } from \"@/contexts/CartContext\";
import { Heart, Minus, Plus, Truck, Shield, RotateCcw } from \"lucide-react\";
import { toast } from \"sonner\";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState(\"M\");
  const [color, setColor] = useState(\"\");
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [tab, setTab] = useState(\"details\");

  useEffect(() => {
    api.get(`/products/${id}`).then((r) => {
      setProduct(r.data);
      setColor((r.data.colors || [])[0] || \"\");
      setIdx(0);
    });
  }, [id]);

  if (!product) return <div className=\"text-center py-32 text-sm text-zinc-500\">Yükleniyor…</div>;

  const addToCart = () => {
    addItem(product, { size, color, quantity: qty });
    toast.success(\"Sepete eklendi.\");
  };
  const buyNow = () => {
    addItem(product, { size, color, quantity: qty });
    nav(\"/sepet\");
  };

  return (
    <div className=\"max-w-[1600px] mx-auto px-5 sm:px-8 py-12\" data-testid=\"product-detail\">
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16\">
        {/* GALLERY */}
        <div>
          <div
            className=\"relative aspect-[4/5] bg-zinc-100 overflow-hidden cursor-zoom-in\"
            onClick={() => setZoom((z) => !z)}
            data-testid=\"product-main-image\"
          >
            <img
              src={product.images?.[idx]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${zoom ? \"scale-150\" : \"scale-100\"}`}
            />
          </div>
          <div className=\"grid grid-cols-4 gap-2 mt-3\">
            {(product.images || []).map((src, i) => (
              <button
                key={i}
                data-testid={`thumb-${i}`}
                onClick={() => setIdx(i)}
                className={`aspect-[4/5] overflow-hidden bg-zinc-100 ${i === idx ? \"ring-1 ring-[#111]\" : \"\"}`}
              >
                <img src={src} alt=\"\" className=\"w-full h-full object-cover\" />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className=\"lg:pl-6 lg:sticky lg:top-28 self-start\">
          <div className=\"text-[11px] tracking-[0.3em] uppercase text-zinc-500\">{product.category}</div>
          <h1 className=\"font-serif text-4xl sm:text-5xl mt-3\">{product.name}</h1>
          <div className=\"mt-4 text-xl\">{formatPrice(product.price)}</div>
          <p className=\"mt-6 text-sm text-zinc-600 leading-relaxed\">{product.description}</p>

          {/* color */}
          {product.colors?.length > 0 && (
            <div className=\"mt-10\">
              <div className=\"flex justify-between text-[11px] tracking-[0.25em] uppercase mb-3\">
                <span>Renk</span>
                <span className=\"text-zinc-500\">{color}</span>
              </div>
              <div className=\"flex gap-2\">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    data-testid={`color-${c}`}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 text-xs border ${color === c ? \"border-[#111] bg-[#111] text-white\" : \"border-zinc-300 hover:border-[#111]\"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* size */}
          <div className=\"mt-8\">
            <div className=\"flex justify-between text-[11px] tracking-[0.25em] uppercase mb-3\">
              <span>Beden</span>
              <button className=\"text-zinc-500 underline\">Beden Rehberi</button>
            </div>
            <div className=\"grid grid-cols-5 gap-2\">
              {(product.sizes || [\"XS\", \"S\", \"M\", \"L\", \"XL\"]).map((s) => (
                <button
                  key={s}
                  data-testid={`size-${s}`}
                  onClick={() => setSize(s)}
                  className={`py-3 text-xs border ${size === s ? \"border-[#111] bg-[#111] text-white\" : \"border-zinc-300 hover:border-[#111]\"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* qty */}
          <div className=\"mt-8 flex items-center gap-6\">
            <div className=\"text-[11px] tracking-[0.25em] uppercase\">Adet</div>
            <div className=\"flex items-center border border-zinc-300\">
              <button data-testid=\"qty-minus\" onClick={() => setQty((q) => Math.max(1, q - 1))} className=\"w-10 h-10 flex items-center justify-center hover:bg-zinc-50\">
                <Minus size={14} strokeWidth={1.25} />
              </button>
              <div data-testid=\"qty-value\" className=\"w-10 text-center text-sm\">{qty}</div>
              <button data-testid=\"qty-plus\" onClick={() => setQty((q) => q + 1)} className=\"w-10 h-10 flex items-center justify-center hover:bg-zinc-50\">
                <Plus size={14} strokeWidth={1.25} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className=\"mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3\">
            <button data-testid=\"add-to-cart-button\" onClick={addToCart} className=\"py-4 border border-[#111] text-[11px] tracking-[0.3em] uppercase hover:bg-[#111] hover:text-white transition\">
              Sepete Ekle
            </button>
            <button data-testid=\"buy-now-button\" onClick={buyNow} className=\"py-4 bg-[#111] text-white text-[11px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition\">
              Hemen Satın Al
            </button>
          </div>

          <button data-testid=\"add-favorite\" onClick={() => toast(\"Favorilere eklendi.\")} className=\"mt-4 flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase\">
            <Heart size={14} strokeWidth={1.25} /> Favorilere Ekle
          </button>

          {/* perks */}
          <div className=\"mt-12 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-8 text-[11px] tracking-wider text-zinc-600\">
            <div className=\"flex flex-col items-start gap-2\"><Truck size={16} strokeWidth={1.25} /> Ücretsiz Kargo<br/><span className=\"text-zinc-400\">2500 TL üzeri</span></div>
            <div className=\"flex flex-col items-start gap-2\"><RotateCcw size={16} strokeWidth={1.25} /> 30 Gün İade<br/><span className=\"text-zinc-400\">Ücretsiz</span></div>
            <div className=\"flex flex-col items-start gap-2\"><Shield size={16} strokeWidth={1.25} /> Güvenli Ödeme<br/><span className=\"text-zinc-400\">SSL · 256bit</span></div>
          </div>

          {/* tabs */}
          <div className=\"mt-12 border-t border-zinc-200\">
            <div className=\"flex gap-8 mt-6 text-[11px] tracking-[0.25em] uppercase\">
              {[\"details\", \"fabric\", \"shipping\"].map((t) => (
                <button key={t} onClick={() => setTab(t)} data-testid={`tab-${t}`} className={`pb-2 ${tab === t ? \"border-b border-[#111]\" : \"text-zinc-500\"}`}>
                  {t === \"details\" ? \"Ürün Detayları\" : t === \"fabric\" ? \"Kumaş Bilgisi\" : \"Kargo Bilgisi\"}
                </button>
              ))}
            </div>
            <div className=\"mt-6 text-sm text-zinc-600 leading-relaxed\">
              {tab === \"details\" && <p>{product.description}</p>}
              {tab === \"fabric\" && <p>{product.fabric || \"Premium kumaş karışımı. 30°C'de hassas yıkama önerilir.\"}</p>}
              {tab === \"shipping\" && (
                <p>
                  Standart kargo 2-4 iş günü içinde teslim edilir. 2500 TL üzeri siparişlerde kargo ücretsizdir.
                  Express seçeneği ile İstanbul içi aynı gün teslimat.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"
