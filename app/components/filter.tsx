"use client";
import { useEffect, useRef } from "react";

export const categories = [
  { id: 1, title: "الكل" },
  { id: 2, title: "الشاورما" },
  { id: 3, title: "الكيزر" },
  { id: 5, title: "وجبات الشاورما" },
  { id: 6, title: "سندوتش ع الفحم" },
  { id: 7, title: "سندوتش غربي" },
  { id: 8, title: "وجبات غربي" },
  { id: 9, title: "الفتات" },
  { id: 10, title: "ميني فتة" },
  { id: 11, title: "بوكس الشاورما" },
  { id: 12, title: "شاورما بالكيلو" },
  { id: 13, title: "فراخ ع الفحم" },
  { id: 14, title: "فروج سوري" },
  { id: 15, title: "وجبات ع الفحم" },
  { id: 16, title: "مشويات بالكيلو" },
  { id: 17, title: "مقبلات" },
  { id: 4, title: "الإضافات" },
];

export default function Filter({ 
  activeCategory, 
  setCategory 
}: { 
  activeCategory: string; 
  setCategory: (cat: string) => void; 
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeButton = document.getElementById(`filter-btn-${activeCategory}`);
    if (activeButton && scrollContainerRef.current) {
      activeButton.scrollIntoView({ 
        behavior: "smooth", 
        inline: "center", 
        block: "nearest" 
      });
    }
  }, [activeCategory]);
  
  const handleCategoryClick = (title: string) => {
    setCategory(title);
    
    if (title === "الكل") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(title);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-2">
      {categories.map(({ id, title }) => {
        const isActive = activeCategory === title;
        
        return (
          <button
            key={id}
            id={`filter-btn-${title}`}
            onClick={() => handleCategoryClick(title)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-sm cursor-pointer border ${
              isActive
                ? "bg-[#CF9D3A] text-white border-[#CF9D3A] shadow-[#CF9D3A]/30 shadow-md scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-[#CF9D3A] hover:border-orange-300"
            }`}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}