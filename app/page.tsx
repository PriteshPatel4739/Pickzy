'use client';
import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '@/lib/api';
import type { Product } from '@/types';
import ProductGrid from '@/components/ProductGrid';
import SearchSortFilter from '@/components/SearchSortFilter';
import { GridSkeleton } from '@/components/Skeletons';
import ErrorState from '@/components/ErrorState';

export default function HomePage() {
  const [all, setAll] = useState<Product[] | null>(null);
  const [shown, setShown] = useState<Product[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (abort?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const [p, c] = await Promise.all([fetchProducts(), fetchCategories()]);
      setAll(p);
      setShown(p);
      setCats(c);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
  }, []);

  if (loading && !all) return <GridSkeleton />;
  if (error) return <ErrorState onRetry={() => load()} message={error} />;
  if (!all) return null;

  return (
    <div className="space-y-4">
      <SearchSortFilter allProducts={all} categories={cats} onResult={setShown} />
      <ProductGrid products={shown} />
    </div>
  );
}
