"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; 
import { Product } from "../../data/menuData";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSize, setNewSize] = useState("عادي");
  const [newPrice, setNewPrice] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      alert("كلمة المرور غير صحيحة ❌");
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push(doc.data() as Product);
      });
      fetchedProducts.sort((a, b) => a.id - b.id);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEditPrice = async (productId: number, size: string, oldPrice: number) => {
    const newPriceStr = prompt(`أدخل السعر الجديد للحجم (${size}):`, oldPrice.toString());
    
    if (newPriceStr !== null && newPriceStr !== "") {
      const newPrice = parseInt(newPriceStr);
      if (isNaN(newPrice)) {
        alert("برجاء إدخال أرقام فقط!");
        return;
      }

      try {
        const productRef = doc(db, "products", productId.toString());
        const productToUpdate = products.find(p => p.id === productId);
        
        if (productToUpdate) {
          const updatedPrices = { ...productToUpdate.prices, [size]: newPrice };
          await updateDoc(productRef, { prices: updatedPrices });
          alert("تم تحديث السعر بنجاح! ✅");
          fetchProducts(); 
        }
      } catch (error) {
        console.error("Error updating price: ", error);
        alert("حدث خطأ أثناء التحديث.");
      }
    }
  };


  const handleDeleteProduct = async (productId: number, title: string) => {
    const isConfirmed = window.confirm(`هل أنت متأكد من مسح وجبة "${title}" نهائياً؟`);
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "products", productId.toString()));
        alert("تم مسح الوجبة بنجاح 🗑️");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product: ", error);
        alert("حدث خطأ أثناء المسح.");
      }
    }
  };


  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory || !newSize || !newPrice) {
      alert("برجاء إكمال البيانات الأساسية!");
      return;
    }

    // eslint-disable-next-line
    const newId = Date.now(); 
    const productData: Product = {
      id: newId,
      title: newTitle,
      category: newCategory,
      description: newDesc,
      prices: { [newSize]: parseInt(newPrice) }
    };

    try {
      await setDoc(doc(db, "products", newId.toString()), productData);
      alert("تمت الإضافة بنجاح! 🎉");
      setIsAddModalOpen(false); 

      setNewTitle(""); setNewCategory(""); setNewDesc(""); setNewPrice(""); setNewSize("عادي");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("حدث خطأ أثناء الإضافة.");
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const existingCategories = Array.from(new Set(products.map(p => p.category)));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">لوحة تحكم المطعم 🔒</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور..."
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 outline-none focus:border-orange-500 text-center"
            required
          />
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors cursor-pointer">
            دخول
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative" dir="rtl">
      

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">إضافة وجبة جديدة 🍔</h2>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-red-500 font-bold cursor-pointer">✕</button>
            </div>
            
            <input type="text" placeholder="اسم الوجبة" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-orange-500" required />
            

            <input list="categories" placeholder="اسم القسم (مثال: شاورما)" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-orange-500" required />
            <datalist id="categories">
              {existingCategories.map(cat => <option key={cat} value={cat} />)}
            </datalist>

            <textarea placeholder="وصف الوجبة (اختياري)" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-orange-500 resize-none" rows={2} />
            
            <div className="flex gap-2">
              <input type="text" placeholder="الحجم (مثال: عادي، وسط)" value={newSize} onChange={(e) => setNewSize(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-orange-500 flex-1" required />
              <input type="number" placeholder="السعر (ج.م)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-orange-500 flex-1" required min="1" />
            </div>

            <button type="submit" className="bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors mt-2 cursor-pointer">
              حفظ الوجبة
            </button>
          </form>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">إدارة المنتجات والأسعار ⚙️</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors cursor-pointer shadow-md shadow-green-500/30"
            >
              + إضافة وجبة
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)} 
              className="bg-red-50 text-red-600 px-5 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors cursor-pointer"
            >
              خروج
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 font-bold text-gray-500">جاري تحميل البيانات...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="hidden md:table-header-group bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-4 font-bold text-gray-600">اسم الوجبة</th>
                    <th className="p-4 font-bold text-gray-600">الأسعار الحالية</th>
                    <th className="p-4 font-bold text-gray-600 text-center">إجراءات</th>
                  </tr>
                </thead>
                
                <tbody className="block md:table-row-group">
                  {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                    <React.Fragment key={category}>

                      <tr className="block md:table-row bg-orange-100/50 border-y border-orange-200">
                        <td colSpan={3} className="block md:table-cell p-3 md:p-4 font-extrabold text-orange-800 text-lg">
                          📋 قسم: {category}
                        </td>
                      </tr>
                      
                      {categoryProducts.map((product) => (
                        <tr key={product.id} className="flex flex-col md:table-row border-b border-gray-200 md:border-gray-50 hover:bg-orange-50/30 transition-colors p-4 md:p-0 gap-3 md:gap-0">
                          
                          <td className="block md:table-cell md:p-4 font-bold text-gray-800 text-lg md:text-base">
                            {product.title}
                          </td>
                          
                          <td className="block md:table-cell md:p-4">
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(product.prices).map(([size, price]) => (
                                <span key={size} className="bg-orange-50 md:bg-gray-100 text-orange-700 md:text-gray-700 text-sm md:text-xs px-3 py-1 rounded-full font-semibold border border-orange-200 md:border-gray-200">
                                  {size}: {price} ج.م
                                </span>
                              ))}
                            </div>
                          </td>
                          
                          <td className="block md:table-cell md:p-4">
                            <div className="flex flex-wrap md:justify-center gap-2">
                              {Object.entries(product.prices).map(([size, price]) => (
                                <button
                                  key={size}
                                  onClick={() => handleEditPrice(product.id, size, price)}
                                  className="bg-orange-100 text-orange-600 text-sm md:text-xs px-4 py-2 md:px-3 md:py-1.5 rounded-lg font-bold hover:bg-orange-500 hover:text-white transition-colors cursor-pointer flex-1 md:flex-none text-center"
                                >
                                  تعديل ({size})
                                </button>
                              ))}
                              <button
                                onClick={() => handleDeleteProduct(product.id, product.title)}
                                className="bg-red-50 text-red-500 text-sm md:text-xs px-4 py-2 md:px-3 md:py-1.5 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-colors cursor-pointer flex-1 md:flex-none text-center"
                              >
                                مسح
                              </button>
                            </div>
                          </td>
                          
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}