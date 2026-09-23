"use client";
import React, { useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; 
import { Product } from "../../data/menuData";
import { categories } from "../components/filter"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrices, setNewPrices] = useState([{ size: '', price: '' }]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handlePriceChange = (index: number, field: string, value: string) => {
    const updatedPrices = [...newPrices];
    updatedPrices[index] = { ...updatedPrices[index], [field]: value };
    setNewPrices(updatedPrices);
    };

  const addPriceRow = () => {
  setNewPrices([...newPrices, { size: '', price: '' }]);
  };

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


  const handleEditPrice = async (productId: number, sizeToEdit: string, oldPrice: number) => {
    const newPrice = prompt(`أدخل السعر الجديد للحجم (${sizeToEdit}):`, oldPrice.toString());
    
    if (!newPrice || isNaN(Number(newPrice))) return;

    try {
      const product = products.find(p => p.id === productId);
      if (!product || !Array.isArray(product.prices)) return;

      const updatedPrices = product.prices.map((p) => 
        p.size === sizeToEdit ? { ...p, price: Number(newPrice) } : p
      );

      await updateDoc(doc(db, "products", productId.toString()), {
        prices: updatedPrices
      });

      fetchProducts();
      alert("تم تعديل السعر بنجاح!");
      
    } catch (error) {
      console.error("Error updating price:", error);
      alert("حدث خطأ أثناء التعديل");
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
    if (!newTitle || !newCategory || !newPrices) {
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
      prices: newPrices.map(p => ({size: p.size, price: Number(p.price)})),
      imageUrl: newImageUrl
    };

    try {
      await setDoc(doc(db, "products", newId.toString()), productData);
      alert("تمت الإضافة بنجاح! 🎉");
      setIsAddModalOpen(false); 

      setNewTitle(""); setNewCategory(""); setNewDesc(""); setNewPrices([{ size: '', price: '' }]); setNewImageUrl("");
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

  const importedCategoriesNames = categories.map((c: string | { title: string }) => typeof c === 'object' ? c.title : c);
  const productCategoriesNames = products.map((p: { category: string | { title: string } }) => typeof p.category === 'object' ? p.category.title : p.category);
  const existingCategories = Array.from(new Set([...importedCategoriesNames, ...productCategoriesNames]));

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
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 outline-none focus:border-[#CF9D3A] text-center text-black"
            required
          />
          <button type="submit" className="w-full bg-[#CF9D3A] text-white font-bold py-3 rounded-xl hover:opacity-80 transition-colors cursor-pointer">
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
            
            <input type="text" placeholder="اسم الوجبة" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-[#CF9D3A]" required />
            

            <input list="categories" placeholder="اسم القسم (مثال: الشاورما)" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-[#CF9D3A]" required />
            <datalist id="categories">
              {existingCategories.map((catName: string) => (
              <option key={catName} value={catName} />
              ))}
            </datalist>

            <input 
              type="url" 
              placeholder="رابط صورة الوجبة (اختياري)" 
              value={newImageUrl} 
              onChange={(e) => setNewImageUrl(e.target.value)} 
              className="border p-3 rounded-xl outline-none focus:border-[#CF9D3A] text-right" 
              dir="ltr" 
            />

            <textarea placeholder="وصف الوجبة (اختياري)" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="border p-3 rounded-xl outline-none focus:border-[#CF9D3A] resize-none" rows={2} />
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">الأحجام والأسعار</label>
              {newPrices.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="الحجم (مثال: لبناني، سوري)"
                    value={item.size}
                    onChange={(e) => handlePriceChange(index, 'size', e.target.value)}
                    className="border p-3 rounded-xl w-1/2 outline-none focus:border-[#CF9D3A]"
                    required
                  />
                  <input
                    type="number"
                    placeholder="السعر (ج.م)"
                    value={item.price}
                    onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                    className="border p-3 rounded-xl w-1/2 outline-none focus:border-[#CF9D3A]"
                    required
                  />
                </div>
              ))}
              <button 
                type="button" 
                onClick={addPriceRow} 
                className="text-[#CF9D3A] font-bold text-right text-sm mt-1 w-fit hover:underline"
              >
                + إضافة حجم وسعر آخر
              </button>
            </div>

            <button type="submit" className="bg-[#CF9D3A] text-white font-bold py-3 rounded-xl hover:opacity-80 transition-colors mt-2 cursor-pointer">
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

                      <tr className="block md:table-row bg-[#FDF5E6]/50 border-y border-orange-200">
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
                              {product.prices.map((item, index) => (
                                <span key={index} className="bg-[#CF9D3A]/10 md:bg-gray-100 text-[#3E2723] md:text-gray-700 text-sm md:text-base px-2 py-1 rounded">
                                  {item.size}: {item.price} ج.م
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="block md:table-cell md:p-4">
                            <div className="flex flex-wrap md:justify-center gap-2">
                              {product.prices.map((item, index) => (
                                <button
                                  key={`edit-${index}`}
                                  onClick={() => handleEditPrice(product.id, item.size, item.price)}
                                  className="bg-[#CF9D3A]/10 text-[#CF9D3A] text-sm md:text-xs px-4 py-2 md:px-3 md:py-1.5 rounded-lg font-bold transition-colors hover:bg-[#CF9D3A]/20"
                                >
                                  تعديل {item.size}
                                </button>
                              ))}
                              <button
                                onClick={() => handleDeleteProduct(product.id, product.title)}
                                className="bg-red-50 text-red-500 text-sm md:text-xs px-4 py-2 md:px-3 md:py-1.5 rounded-lg font-bold transition-colors hover:bg-red-100"
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