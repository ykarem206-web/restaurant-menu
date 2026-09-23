

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  prices: { size: string; price: number }[];
  imageUrl?: string;
};

export type CartItem = Product & {
  count: number;
  selectedSize: string; 
  selectedPrice: number; 
};