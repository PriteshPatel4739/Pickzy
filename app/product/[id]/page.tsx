'use client';
import { useEffect, useState } from 'react';
import { fetchProductById } from '@/lib/api';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [p, setP] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { add } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setP(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-xl bg-muted" />
      <div className="space-y-3">
        <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-24 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );

  else if (error) return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{error}</p>
      <button onClick={() => router.refresh()} className="rounded-md border px-3 py-2 text-sm hover:bg-accent">Try again</button>
    </div>
  );

  else if (!p) return null;

  else {return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-xl border p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} className="mx-auto h-80 w-full max-w-md object-contain" />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">{formatCurrency(p.price)}</span>
          <span className="rounded bg-accent px-2 py-1 text-xs">⭐ {p.rating?.rate ?? '-'} ({p.rating?.count ?? 0})</span>
        </div>
        <p className="text-sm text-muted-foreground leading-6">{p.description}</p>
        <div className="pt-2">
          <button
            onClick={() => add(p)}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );}
}
