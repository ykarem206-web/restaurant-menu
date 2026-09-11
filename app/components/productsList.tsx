import { Product, CartItem } from "@/data/menuData";

export default function ProductsList(props: {
  products: Product[];
  onAddToCart: (product: Omit<CartItem, 'count'>) => void;
}) {
  
  const groupedProducts = props.products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="flex flex-col gap-10 mb-4">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} id={category} className="flex flex-col gap-5 scroll-mt-28">
          
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-gray-800 whitespace-nowrap">
              {category}
            </h2>
            <div className="flex-1 h-0.5 bg-gray-200 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categoryProducts.map((product) => (
              <SingleProduct
                key={product.id}
                {...product}
                onAddToCart={props.onAddToCart}
              />
            ))}
          </div>
          
        </div>
      ))}
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-row transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      
      <div className="w-1/3 min-w-25 bg-linear-to-br from-gray-100 to-gray-200 relative shrink-0 flex items-center justify-center border-l border-gray-100">
        <span className="text-gray-400 text-xs font-medium">صورة الوجبة</span>
      </div>

      <div className="p-3 flex flex-col flex-1 gap-2 justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-md leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {Object.entries(prices).map(([size, price]) => (
            <div
              key={size}
              className="flex justify-between items-center bg-gray-50/50 p-2 rounded-xl border border-gray-100 transition-colors hover:bg-orange-50/30"
            >
              <span className="text-xs font-semibold text-gray-700">
                {size} <span className="text-gray-300 mx-1">|</span>{" "}
                <span className="text-orange-600 font-bold text-sm">{price} ج.م</span>
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
                className="bg-orange-500 text-white w-8 h-8 rounded-full flex justify-center items-center font-bold text-lg cursor-pointer transition-all hover:bg-orange-600 hover:shadow-md active:scale-90"
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