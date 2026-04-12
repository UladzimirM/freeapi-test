export interface Product extends Record<string, unknown> {
  name: string;
  category: string;
  description: string;
  price: string;
  stock: string;
  mainImage: string;
}
