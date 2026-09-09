"use client";
import { useState } from "react";
import Header from "./header";
import ProductsList from "./productsList";
import Filter from "./filter";
import Cart from "./cart";
import { initialProducts } from "@/data/menuData";
import { CartItem } from "@/data/menuData";
import { Product } from "@/data/menuData";



export default function MainApp () {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [activeCategory, setActiveCategory] = useState("الكل");

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart (product: Omit<CartItem, 'count'>) {
    const existingItem = cartItems.find((item) => product.id === item.id && product.selectedSize === item.selectedSize);

    if(existingItem){
      const updatedCart = cartItems.map((item) => {
        return (item.id === product.id && item.selectedSize === product.selectedSize) ? {...item, count:item.count +1} : item;
      })
      setCartItems(updatedCart)
    } else{
      setCartItems([...cartItems, {...product, count: 1}])
    }
    
  }

  function decreaseFromCart (id:number, selectedSize: string) {
    const updatedCart = cartItems.map((item) => {
      return item.id === id && item.selectedSize === selectedSize ? {...item, count: item.count -1} : item;
    })

    const lastUpdatedCart = updatedCart.filter((item) => {
      return item.count > 0;
    })
    setCartItems(lastUpdatedCart);
  }

  const filteredProducts = activeCategory === "الكل" ? products : products.filter((product) => {
    return product.category === activeCategory;
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 gap-6 w-full max-w-md mx-auto pt-6 pb-32 font-sans relative" dir="rtl">
      
      <Header />
      
      <div className="px-4 flex flex-col gap-6">
        <Filter setCategory={setActiveCategory} />
        <ProductsList products={filteredProducts} onAddToCart={addToCart} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white px-6 py-5 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.08)] rounded-t-3xl border-t border-gray-100 z-50">
        <Cart selectedProducts={cartItems} onDecreaseFromCart={decreaseFromCart} />
      </div>
      
    </div>
  )
} 