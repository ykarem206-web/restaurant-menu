import { Product, CartItem } from "@/data/menuData";
import Image from "next/image";


const categoryImages: { [key: string]: string } = {
  "الشاورما": "/categories/shawrma.jpg",
  "الكيزر": "/categories/kayzr.png",
  "وجبات الشاورما": "/categories/wgbatelshawrma.png",
  "سندوتش ع الفحم": "/categories/sandwitsh3lfa7m.png",
  "سندوتش غربي": "/categories/sandwitsh8arby.jpg",
  "وجبات غربي": "/categories/wgbat8arby.webp",
  "الفتات": "/categories/fatitelshawrma.png",
  "ميني فتة": "/categories/fatitelshawrma.png",
  "بوكس الشاورما": "/categories/boxelshawrma.png",
  "شاورما بالكيلو": "/categories/shawrmabykilo.png",
  "فراخ ع الفحم": "/categories/fera53lfa7m.png",
  "فروج سوري": "/categories/fera5shwaya.png",
  "وجبات ع الفحم": "/categories/wgbat3lfa7n.png",
  "مشويات بالكيلو": "/categories/mshwyatbykilo.png",
  "مقبلات": "/categories/mokabilat.png",
  "الإضافات": "/categories/edafat.png",
};

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

          <div className="flex justify-start w-full mb-10 mt-6 pr-10 md:pr-12" dir="rtl">
            <div className="relative w-55 md:w-65 h-12 md:h-14 bg-[#CF9D3A] rounded-full flex items-center shadow-md">
              {categoryImages[category] && (
                <div className="absolute -right-8 md:-right-10 top-1/2 -translate-y-1/2 w-20 h-20 md:w-23.75 md:h-23.75 rounded-full border-4 border-[#CF9D3A] bg-white p-0.75 shadow-sm z-10">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={categoryImages[category]}
                      alt={category}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              <h2 className="text-[22px] md:text-2xl font-black text-[#3E2723] w-full text-center pr-8 md:pr-12 pb-1 drop-shadow-sm">
                {category}
              </h2>
              
            </div>
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
  imageUrl,
  onAddToCart,
}: Product & { onAddToCart: (product: Omit<CartItem, 'count'>) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-row transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      
      {imageUrl && (
        <div className="w-1/3 min-w-25 bg-gray-50 relative shrink-0 flex items-center justify-center border-l border-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

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
          {prices?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50/50 p-2 rounded-xl border border-gray-100 transition-colors hover:bg-gray-50"
            >
              <span className="text-xs font-semibold text-gray-700">
                {item.size} <span className="text-gray-300 mx-1">|</span>{" "}
                <span className="text-[#CF9D3A] font-bold text-sm">{item.price} ج.م</span>
              </span>

              <button
                onClick={() => {
                  onAddToCart({
                    id,
                    title,
                    category,
                    description,
                    prices,
                    selectedSize: item.size,
                    selectedPrice: item.price,
                  });
                }}
                className="bg-[#CF9D3A] text-white w-8 h-8 rounded-full flex justify-center items-center font-bold text-lg cursor-pointer transition-colors hover:opacity-80"
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