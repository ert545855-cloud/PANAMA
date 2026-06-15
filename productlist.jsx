"import React, { useEffect, useState } from \"react\";
import { useParams } from \"react-router-dom\";
import { api } from \"@/lib/api\";
import ProductCard from \"@/components/ProductCard\";

const TITLES = {
  pantolon: \"Pantolon\",
  elbise: \"Elbise\",
  etek: \"Etek\",
  blazer: \"Blazer\",
};

export default function ProductList({ mode }) {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (mode === \"category\") params.category = slug;
    if (mode === \"new\") params.new_arrival = true;
    params.limit = 50;
    api.get(\"/products\", { params }).then((r) => setProducts(r.data)).finally(() => setLoading(false));
  }, [slug, mode]);

  const title =
    mode === \"new\" ? \"Yeni Sezon\" : mode === \"collection\" ? \"Tüm Koleksiyon\" : TITLES[slug] || (slug || \"Ürünler\");

  return (
    <div className=\"max-w-[1600px] mx-auto px-5 sm:px-8 pt-12 pb-24\" data-testid=\"product-list-page\">
      <div className=\"border-b border-zinc-200 pb-10 mb-12\">
        <div className=\"text-[11px] tracking-[0.3em] uppercase text-zinc-500 mb-3\">Koleksiyon</div>
        <h1 className=\"font-serif text-5xl sm:text-6xl\">{title}</h1>
        <div className=\"mt-4 text-sm text-zinc-500\">{products.length} ürün</div>
      </div>
      {loading ? (
        <div className=\"text-center text-sm text-zinc-500 py-32\">Yükleniyor…</div>
      ) : products.length === 0 ? (
        <div className=\"text-center text-sm text-zinc-500 py-32\">Henüz ürün bulunmuyor.</div>
      ) : (
        <div className=\"grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-14\">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
"
