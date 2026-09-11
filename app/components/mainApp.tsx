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


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Header />
      <div className="flex flex-col lg:flex-row w-full max-w-350 mx-auto mt-6 px-4 md:px-8 gap-6 pb-87.5 lg:pb-10 lg:items-start">
        <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
          <div className="sticky top-0 z-40 bg-gray-50 pt-2 pb-4 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-gray-100 mb-6">
            <Filter activeCategory={activeCategory} setCategory={setActiveCategory} />
          </div>
          <ProductsList products={products} onAddToCart={addToCart} />
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white px-6 py-5 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.08)] rounded-t-3xl border-t border-gray-100 
                        lg:sticky lg:top-6 lg:bottom-auto lg:left-auto lg:right-auto lg:w-87.5 xl:w-100 lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl lg:px-6 lg:py-6 lg:shrink-0 lg:overflow-y-auto lg:h-[calc(100vh-3rem)]">
          
          <h2 className="hidden lg:block text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">  سلة الطلبات 🛒</h2>
          <Cart selectedProducts={cartItems} onDecreaseFromCart={decreaseFromCart} />
        </div>
      </div>
    </div>
  )
} 