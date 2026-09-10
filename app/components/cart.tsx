import { CartItem } from "@/data/menuData";


export default function Cart(props: {
  selectedProducts: CartItem[];
  onDecreaseFromCart: (id: number, selectedSize: string) => void;
}) {
  const renderedProducts = props.selectedProducts.map((product, index) => {
    return (
      <SelectedProduct

        key={`${product.id}-${product.selectedSize}-${index}`} 
        id={product.id}
        title={product.title}
        selectedPrice={product.selectedPrice} 
        selectedSize={product.selectedSize}   
        count={product.count}
        onDecreaseFromCart={props.onDecreaseFromCart}
      />
    );
  });


  const totalPrice = props.selectedProducts.reduce((total, product) => {
    return (product.selectedPrice * product.count) + total;
  }, 0);

  if (props.selectedProducts.length <= 0) {
    return (
      <div className="text-center text-gray-400 font-medium py-2">
        السلة فارغة حالياً 🛒
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1 scrollbar-hide">
        {renderedProducts}
      </ul>

      <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
        <span className="text-gray-600 font-bold text-sm">إجمالي السعر:</span>
        <span className="text-xl font-black text-orange-600">
          {totalPrice} ج.م
        </span>
      </div>
    </div>
  );
}


function SelectedProduct({
  id,
  title,
  selectedPrice,
  selectedSize,
  count,
  onDecreaseFromCart,
}: {
  id: number;
  title: string;
  selectedPrice: number;
  selectedSize: string;
  count: number;
  onDecreaseFromCart: (id: number, selectedSize: string) => void;
}) {
  return (
    <li className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-sm list-none">
      <div className="flex flex-col">
        <span className="font-bold text-gray-800 text-sm line-clamp-1">
          {title} <span className="text-orange-500 text-xs font-normal">({selectedSize})</span>
        </span>
        <span className="text-xs text-gray-500 font-medium mt-1">
          {selectedPrice} ج.م <span className="mx-1 text-gray-400">×</span> {count}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-700 w-4 text-center">{count}</span>
        <button
          onClick={() => {
            onDecreaseFromCart(id, selectedSize);
          }}
          className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white w-7 h-7 rounded-lg flex justify-center items-center font-bold text-lg transition-colors shadow-sm cursor-pointer"
        >
          -
        </button>
      </div>
    </li>
  );
}