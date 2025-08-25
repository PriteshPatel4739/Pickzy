const BASE = process.env.NEXT_PUBLIC_FAKE_STORE_BASE_URL || 'https://fakestoreapi.com';

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchProductById(id: string | number) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}