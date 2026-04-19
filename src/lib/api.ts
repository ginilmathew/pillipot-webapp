const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1/api";

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  productCode?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  videoUrl?: string;
  categoryId?: string;
  categoryName?: string;
  sku?: string;
  price: number;
  stockQuantity: number;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}
