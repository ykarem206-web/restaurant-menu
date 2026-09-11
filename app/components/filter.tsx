"use client";
import { useEffect, useRef } from "react";

const categories = [
  { id: 1, title: "الكل" },
  { id: 2, title: "المناقيش" },
  { id: 3, title: "البيتزا" },
  { id: 4, title: "شاورما" },
  { id: 5, title: "فتات الشاورما" },
  { id: 6, title: "وجبات الشاورما" },
  { id: 7, title: "غربي" },
  { id: 8, title: "حلويات" },
  { id: 9, title: "اوزان الشاورما" },
  { id: 10, title: "سندوتش البطاطا" },
  { id: 11, title: "ريزو" },
  { id: 12, title: "مقبلات بارد" },
  { id: 13, title: "مقبلات ساخنة" },
  { id: 14, title: "قسم الكريب" },
  { id: 15, title: "فراخ شواية سوري" },
  { id: 16, title: "فرايد تشيكن سوري" },
  { id: 17, title: "ماريا" },
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
                ? "bg-orange-500 text-white border-orange-500 shadow-orange-500/30 shadow-md scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-300"
            }`}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}