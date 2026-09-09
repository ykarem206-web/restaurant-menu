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

export default function Filter({ setCategory }: { setCategory: (activeCategory: string) => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 mb-4 scrollbar-hide px-2">
      {categories.map(({ id, title }) => {
        return (
          <button
            key={id}
            onClick={() => {
              setCategory(title);
            }}
            className="whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-sm bg-white text-gray-700 border border-gray-200 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-300 cursor-pointer"
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}