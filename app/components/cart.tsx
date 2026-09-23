"use client";
import { useState } from "react";
import { CartItem } from "@/data/menuData";

export default function Cart(props: {
  selectedProducts: CartItem[];
  onDecreaseFromCart: (id: number, selectedSize: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const totalPrice = props.selectedProducts.reduce(
    (total, product) => product.selectedPrice * product.count + total,
    0
  );

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(customerPhone)) {
      setErrorMsg("رقم الهاتف غير صحيح. تأكد أنه رقم مصري من 11 رقم (مثال: 01012345678)");
      return;
    }


    const lastOrderTime = localStorage.getItem("lastOrderTime");
    if (lastOrderTime) {
      const timeDiff = Date.now() - parseInt(lastOrderTime);
      const cooldown = 3 * 60 * 1000;
      
      if (timeDiff < cooldown) {
        const minutesLeft = Math.ceil((cooldown - timeDiff) / 60000);
        setErrorMsg(`لقد قمت بإرسال طلب بالفعل! يرجى الانتظار ${minutesLeft} دقيقة قبل إرسال طلب جديد.`);
        return;
      }
    }

    const phoneNumber = "201020685597"; 

    let message = `مرحباً، أريد طلب الآتي:\n\n`;
    message += `👤 *الاسم:* ${customerName}\n`;
    message += `📍 *العنوان:* ${customerAddress}\n`;
    message += `📞 *رقم الهاتف:* ${customerPhone}\n`;
    message += `---------------------------\n\n`;

    props.selectedProducts.forEach((product, index) => {
      const itemTotal = product.selectedPrice * product.count;
      message += `${index + 1}. ${product.title} (${product.selectedSize})\n`;
      message += `الكمية: ${product.count} | السعر: ${itemTotal} ج.م\n`;
    });

    message += `\n💰 *الإجمالي الكلي: ${totalPrice} ج.م*\n`;
    message += `\nشكراً لكم!`;

    localStorage.setItem("lastOrderTime", Date.now().toString());

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    setIsModalOpen(false);
  };

  if (props.selectedProducts.length <= 0) {
    return (
      <div className="text-center text-gray-400 font-medium py-4 flex flex-col items-center gap-2">
        <span className="text-4xl">🛒</span>
        <span>سلة الطلبات فارغة حالياً</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-1 scrollbar-hide">
          {props.selectedProducts.map((product, index) => (
            <SelectedProduct
              key={`${product.id}-${product.selectedSize}-${index}`}
              {...product}
              onDecreaseFromCart={props.onDecreaseFromCart}
            />
          ))}
        </ul>

        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-bold text-sm">إجمالي السعر:</span>
            <span className="text-2xl font-black text-[#CF9D3A]">
              {totalPrice} ج.م
            </span>
          </div>


          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#CF9D3A] hover:opacity-80 text-white font-bold text-lg py-3 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#CF9D3A]/20 cursor-pointer"
          >
            إتمام الطلب
          </button>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" dir="rtl">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">بيانات التوصيل</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleWhatsAppCheckout} className="flex flex-col gap-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input 
                  type="text" 
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="محمد أحمد..."
                  className="w-full border border-gray-200 text-black rounded-xl p-3 outline-none focus:border-[#CF9D3A] focus:ring-1 focus:ring-[#CF9D3A] transition-all bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان بالتفصيل</label>
                <textarea 
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="المنطقة، الشارع، رقم العمارة، الدور..."
                  rows={2}
                  className="w-full border border-gray-200 text-black rounded-xl p-3 outline-none focus:border-[#CF9D3A] focus:ring-1 focus:ring-[#CF9D3A] transition-all bg-gray-50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input 
                  type="tel" 
                  required
                  maxLength={11}
                  value={customerPhone}
                  onChange={(e) => {
                    const onlyEnglishNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setCustomerPhone(onlyEnglishNumbers);
                    setErrorMsg("");
                  }}
                  placeholder="01xxxxxxxxx"
                  className="w-full border border-gray-200 text-black rounded-xl p-3 outline-none focus:border-[#CF9D3A] focus:ring-1 focus:ring-[#CF9D3A] transition-all bg-gray-50 text-left"
                  dir="ltr"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button 
                  type="submit" 
                  className="flex-1 bg-[#25D366] hover:bg-[#1ebd5a] flex items-center justify-center gap-2 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#25D366]/30"
                >
                  <span>تأكيد وإرسال</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

function SelectedProduct({
  id,
  title,
  selectedPrice,
  selectedSize,
  count,
  onDecreaseFromCart,
}: CartItem & { onDecreaseFromCart: (id: number, selectedSize: string) => void }) {
  return (
    <li className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm list-none">
      <div className="flex flex-col">
        <span className="font-bold text-gray-800 text-sm line-clamp-1">
          {title} <span className="text-[#CF9D3A] text-xs font-bold bg-orange-50 px-2 py-0.5 rounded-md mr-1">({selectedSize})</span>
        </span>
        <span className="text-xs text-gray-500 font-medium mt-1.5 flex items-center gap-1">
          <span className="text-gray-800 font-bold">{selectedPrice} ج.م</span>
          <span className="text-gray-300">×</span>
          <span>{count}</span>
        </span>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
        <span className="font-bold text-gray-800 w-5 text-center text-sm">{count}</span>
        <button
          onClick={() => onDecreaseFromCart(id, selectedSize)}
          className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white w-7 h-7 rounded-md flex justify-center items-center font-bold text-lg transition-all active:scale-90 cursor-pointer"
        >
          -
        </button>
      </div>
    </li>
  );
}