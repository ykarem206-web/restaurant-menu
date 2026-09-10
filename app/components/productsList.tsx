import { Product } from "@/data/menuData"; 
import { CartItem } from "@/data/menuData";

export default function ProductsList(props: {
  products: Product[];
  onAddToCart: (product: Omit<CartItem, 'count'>) => void;
}) {
  const singleProduct = props.products.map((product) => {
    return (
      <SingleProduct
        key={product.id}
        id={product.id}
        title={product.title}
        prices={product.prices} 
        category={product.category}
        description={product.description}
        onAddToCart={props.onAddToCart}
      />
    );
  });

  return (
    // خلينا الشبكة عمود واحد في الموبايل عشان تدي شكل الليست بتاع طلبات
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
      {singleProduct}
    </div>
  );
}

function SingleProduct({
  id,
  title,
  prices,
  category,
  description,
  onAddToCart,
}: Product & { onAddToCart: (product: Omit<CartItem, 'count'>) => void }) {
  return (
    // التعديل السحري هنا: flex-row بدل flex-col عشان العناصر تيجي جنب بعض
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-row hover:shadow-md transition-shadow">
      
      {/* حاوية الصورة: خدت عرض ثابت (تلت المساحة تقريباً) */}
      <div className="w-1/3 min-w-30 bg-gray-200 relative shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center p-2">
          صورة الوجبة
        </div>
      </div>

      {/* حاوية النصوص والتفاصيل: خدت باقي المساحة بـ flex-1 */}
      <div className="p-3 flex flex-col flex-1 gap-2 justify-between">

        <div>
          <h3 className="font-bold text-gray-800 text-base leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* الأسعار والزراير */}
        <div className="flex flex-col gap-2 mt-1">
          {Object.entries(prices).map(([size, price]) => (
            <div
              key={size}
              className="flex justify-between items-center bg-gray-50 p-1.5 rounded-lg border border-gray-100"
            >
              <span className="text-xs font-medium text-gray-700">
                {size} <span className="text-gray-300 mx-1">|</span>{" "}
                <span className="text-orange-600 font-bold">{price} ج.م</span>
              </span>

              <button
                onClick={() => {
                  onAddToCart({
                    id,
                    title,
                    category,
                    description,
                    prices,
                    selectedSize: size, 
                    selectedPrice: price,
                  });
                }}
                className="bg-orange-500 text-white w-7 h-7 rounded-full flex justify-center items-center font-bold text-lg cursor-pointer hover:bg-orange-600 shadow-sm"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}