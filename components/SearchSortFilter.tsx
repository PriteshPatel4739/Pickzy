'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types';

export type Props = {
  allProducts: Product[];
  categories: string[];
  onResult: (items: Product[]) => void;
};

export default function SearchSortFilter({ allProducts, categories, onResult }: Props) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc' | ''>('');
  const [cat, setCat] = useState<string>('');

  const filtered = useMemo(() => {
    let arr = allProducts;
    if (q) arr = arr.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    if (cat) arr = arr.filter(p => p.category === cat);
    if (sort === 'asc') arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === 'desc') arr = [...arr].sort((a, b) => b.price - a.price);
    return arr;
  }, [allProducts, q, sort, cat]);

  useEffect(() => onResult(filtered), [filtered, onResult]);

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border px-3 py-2 sm:max-w-xs"
      />
      <select
        value={cat}
        onChange={e => setCat(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 sm:w-auto"
      >
        <option value="">All categories</option>
        {categories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={e => setSort(e.target.value as 'asc' | 'desc' | '')}
        className="w-full rounded-lg border px-3 py-2 sm:w-auto"
      >
        <option value="">Sort by price</option>
        <option value="asc">Low → High</option>
        <option value="desc">High → Low</option>
      </select>
    </div>
  );
}
