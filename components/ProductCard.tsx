import Link from 'next/link';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.id}`} className="group rounded-2xl border p-3 transition hover:shadow-md">
      <div className="aspect-square overflow-hidden rounded-xl bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} className="h-full w-full object-contain p-6 transition group-hover:scale-105" />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 text-sm font-medium">{p.title}</h3>
        <p className="text-xs text-muted-foreground capitalize">{p.category}</p>
        <p className="text-base font-semibold">{formatCurrency(p.price)}</p>
      </div>
    </Link>
  );
}
