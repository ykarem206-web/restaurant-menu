"use client";
import { useState, useEffect, useRef } from "react";
import Header from "./header";
import ProductsList from "./productsList";
import Filter from "./filter";
import Cart from "./cart";
import { CartItem, Product } from "@/data/menuData";
import { collection, getDocs} from "firebase/firestore";
import { db } from "@/config/firebase"

export default function MainApp () {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isManualScroll = useRef(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts: Product[] = [];
        
        querySnapshot.forEach((doc) => {
          fetchedProducts.push(doc.data() as Product);
        });

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    const lastUpdatedCart = updatedCart.filter((item) => item.count > 0);
    setCartItems(lastUpdatedCart);
  }

  const handleCategorySelect = (category: string) => {
    isManualScroll.current = true;
    setActiveCategory(category);
    
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000); 
  };

  useEffect(() => {
    if (products.length === 0) return;
    const categories = Array.from(new Set(products.map((p) => p.category)));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isManualScroll.current) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px", 
        threshold: 0,
      }
    );

    categories.forEach((category) => {
      const element = document.getElementById(category);
      if (element) observer.observe(element);
    });

    const handleTopScroll = () => {
      if (window.scrollY < 100 && !isManualScroll.current) {
        setActiveCategory("الكل");
      }
    };
    window.addEventListener("scroll", handleTopScroll);

    return () => {
      categories.forEach((category) => {
        const element = document.getElementById(category);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-bold">جاري تحميل المنيو...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Header />
      <div className="flex flex-col lg:flex-row w-full max-w-350 mx-auto mt-6 px-4 md:px-8 gap-6 pb-87.5 lg:pb-10 lg:items-start">
        <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
          <div className="sticky top-0 z-40 bg-gray-50 pt-2 pb-4 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-gray-100 mb-6">
            <Filter activeCategory={activeCategory} setCategory={handleCategorySelect} />
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