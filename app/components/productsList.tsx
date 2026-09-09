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
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      
      {/* مكان مجهز لصورة الوجبة */}
      <div className="h-32 bg-gray-200 w-full relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          صورة الوجبة
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">

        <div>
          <h3 className="font-bold text-gray-800 text-lg leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {Object.entries(prices).map(([size, price]) => (
            <div
              key={size}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100"
            >
              <span className="text-sm font-medium text-gray-700">
                {size} <span className="text-xs text-gray-400 mx-1">|</span>{" "}
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
                className="bg-orange-500 text-white w-8 h-8 rounded-full flex justify-center items-center font-bold text-lg cursor-pointer hover:bg-orange-600 shadow-sm"
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