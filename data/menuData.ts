

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  prices: { [key: string]: number }; 
};

export type CartItem = Product & {
  count: number;
  selectedSize: string; 
  selectedPrice: number; 
};