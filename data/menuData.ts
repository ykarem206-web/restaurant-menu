

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  prices: { [key: string]: number }; 
};

export type CartItem = Product & {
  count: number;
  selectedSize: string; 
  selectedPrice: number; 
};


export const initialProducts : Product[] =[

  { id: 1, title: "ميكس جبن", category: "المناقيش", description: "", prices: { "عادي": 25 } },
  { id: 2, title: "شيش قشقوان", category: "المناقيش", description: "", prices: { "عادي": 32 } },
  { id: 3, title: "مكسيكي قشقوان", category: "المناقيش", description: "", prices: { "عادي": 32 } },
  { id: 4, title: "لانشون قشقوان", category: "المناقيش", description: "", prices: { "عادي": 32 } },
  { id: 5, title: "تركي قشقوان", category: "المناقيش", description: "", prices: { "عادي": 35 } },
  { id: 6, title: "سلامي قشقوان", category: "المناقيش", description: "", prices: { "عادي": 35 } },
  { id: 7, title: "سجق قشقوان", category: "المناقيش", description: "", prices: { "عادي": 38 } },
  { id: 8, title: "حلوم", category: "المناقيش", description: "", prices: { "عادي": 28 } },
  { id: 9, title: "زعتر موتزاريلا", category: "المناقيش", description: "", prices: { "عادي": 22 } },
  { id: 10, title: "محمرة موتزاريلا", category: "المناقيش", description: "", prices: { "عادي": 22 } },
  { id: 11, title: "كيري", category: "المناقيش", description: "", prices: { "عادي": 25 } },
  { id: 12, title: "سنفورة", category: "المناقيش", description: "", prices: { "عادي": 27 } },
  { id: 13, title: "قشقوان", category: "المناقيش", description: "", prices: { "عادي": 27 } },
  { id: 14, title: "بيتزا سوارية", category: "المناقيش", description: "", prices: { "عادي": 28 } },


  { id: 15, title: "فصول الأربعة", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - زيتون - مشروم - ذرة", prices: { "وسط": 100, "لارج": 135 } },
  { id: 16, title: "شاورما فراخ", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - شرائح شاورما دجاج طازجة", prices: { "وسط": 150, "لارج": 190 } },
  { id: 17, title: "شاورما لحمة", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - بصل - شرائح شاورما لحمة طازجة", prices: { "وسط": 175, "لارج": 220 } },
  { id: 18, title: "شاورما ميكس", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - بصل - شرائح شاورما دجاج ولحمة", prices: { "وسط": 170, "لارج": 205 } },
  { id: 19, title: "سلامي", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - زيتون - شرائح السلامي", prices: { "وسط": 135, "لارج": 165 } },
  { id: 20, title: "هوت دوج", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - زيتون - شرائح الهوت دوج", prices: { "وسط": 125, "لارج": 160 } },
  { id: 21, title: "مرجريتا", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا", prices: { "وسط": 105, "لارج": 145 } },
  { id: 22, title: "سجق", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - زيتون - شرائح السجق", prices: { "وسط": 155, "لارج": 195 } },
  { id: 23, title: "بسطرمة", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - شرائح بسطرمة - زيتون", prices: { "وسط": 160, "لارج": 210 } },
  { id: 24, title: "تركي مدخن", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - زيتون - صدور دجاج مقلي - تركي مدخن", prices: { "وسط": 155, "لارج": 190 } },
  { id: 25, title: "فراخ باربيكيو", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - زيتون - قطع دجاج فريش - صوص باربيكيو", prices: { "وسط": 145, "لارج": 185 } },
  { id: 26, title: "مشكل جبن", category: "البيتزا", description: "موتزاريلا جبنة - حلوم - جبنة كيري - صوص الشيدر", prices: { "وسط": 125, "لارج": 165 } },
  { id: 27, title: "فرسان الشام مشكل لحوم", category: "البيتزا", description: "صلصة البيتزا - موتزاريلا - فلفل - زيتون - سجق - هوت دوج - شرائح لحمة", prices: { "وسط": 160, "لارج": 220 } },


  { id: 28, title: "عيش كايزر", category: "شاورما", description: "", prices: { "دجاج": 45, "لحمة": 50, "ميكس": 60 } },
  { id: 29, title: "عيش سوري كبير", category: "شاورما", description: "", prices: { "دجاج": 70, "لحمة": 75, "ميكس": 80 } },
  { id: 30, title: "عيش سوري جامبو", category: "شاورما", description: "", prices: { "دجاج": 89, "لحمة": 97, "ميكس": 105 } },
  { id: 31, title: "عيش فرنساوي", category: "شاورما", description: "", prices: { "دجاج": 85, "لحمة": 95, "ميكس": 100 } },


  { id: 32, title: "فتة شاورما فراخ", category: "فتات الشاورما", description: "رز بسمتي + عيش محمص + شرائح شاورما فراخ + ثومية + مخلل", prices: { "ميديم": 75, "لارج": 110 } },
  { id: 33, title: "فتة شاورما لحمة", category: "فتات الشاورما", description: "رز بسمتي + عيش محمص + شرائح شاورما لحم + ثومية + مخلل", prices: { "ميديم": 85, "لارج": 130 } },
  { id: 34, title: "فتة شاورما ميكس", category: "فتات الشاورما", description: "رز بسمتي + عيش محمص + شرائح شاورما ميكس + ثومية + مخلل", prices: { "ميديم": 80, "لارج": 120 } },


  { id: 35, title: "عربي سنجل (6 قطع)", category: "وجبات الشاورما", description: "6 قطع - بطاطس مقرمشة - ثومية - مخلل", prices: { "دجاج": 95, "ميكس": 120, "لحمة": 130 } },
  { id: 36, title: "عربي اكسترا (9 قطع)", category: "وجبات الشاورما", description: "9 قطع - بطاطس مقرمشة - ثومية - مخلل", prices: { "دجاج": 125, "ميكس": 145, "لحمة": 160 } },
  { id: 37, title: "عربي دبل (12 قطعة)", category: "وجبات الشاورما", description: "12 قطعة - بطاطس مقرمشة - ثومية - مخلل", prices: { "دجاج": 165, "ميكس": 185, "لحمة": 200 } },


  { id: 38, title: "كرسبي", category: "غربي", description: "4 قطع صدور دجاج - عيش - ارز بطاطس مقرمشة - ثومية - مخلل", prices: { "سندوتش": 90, "وجبة": 175 } },
  { id: 39, title: "زنجر", category: "غربي", description: "4 قطع صدور دجاج - عيش - ارز بطاطس مقرمشة - ثومية - مخلل", prices: { "سندوتش": 95, "وجبة": 175 } },
  { id: 40, title: "كرانشي", category: "غربي", description: "4 قطع صدور دجاج - شرائح تركي مدخن - عيش - ارز - بطاطس مقرمشة - ثومية - مخلل", prices: { "سندوتش": 105, "وجبة": 185 } },
  { id: 41, title: "شيش طاووق", category: "غربي", description: "قطع صدور - عيش - ارز - بطاطس مقرمشة - ثومية - مخلل", prices: { "سندوتش": 100, "وجبة": 170 } },
  { id: 42, title: "اسكالوب بانيه", category: "غربي", description: "4 قطع فراخ مع رز بسمتي وبطاطس وثومية ومخلل", prices: { "سندوتش": 105, "وجبة": 175 } },
  { id: 43, title: "فاهيتا", category: "غربي", description: "صدور دجاج - فلفل - مشروم - ذرة - صوص صويا - ارز - بطاطس مقرمشة - ثومية - مخلل", prices: { "سندوتش": 105, "وجبة": 175 } },
  { id: 44, title: "مكسيكي", category: "غربي", description: "شرائح الفراخ - فلفل حار - بصل - ذرة - عيش - ارز - بطاطس - ثومية - مخلل", prices: { "سندوتش": 105, "وجبة": 175 } },


  { id: 45, title: "عسل نوتيلا", category: "حلويات", description: "", prices: { "عادي": 35 } },
  { id: 46, title: "نوتيلا", category: "حلويات", description: "", prices: { "عادي": 20 } },
  { id: 47, title: "كيري نوتيلا", category: "حلويات", description: "", prices: { "عادي": 35 } },


  { id: 48, title: "ربع كيلو", category: "اوزان الشاورما", description: "ربع كيلو شاورما - عيش سوري - ثومية - مخلل - بطاطس مقرمشة", prices: { "دجاج": 145, "ميكس": 170, "لحمة": 180 } },
  { id: 49, title: "نصف كيلو", category: "اوزان الشاورما", description: "نص كيلو شاورما - عيش سوري - ثومية - مخلل - بطاطس مقرمشة", prices: { "دجاج": 250, "ميكس": 320, "لحمة": 350 } },
  { id: 50, title: "كيلو", category: "اوزان الشاورما", description: "كيلو شاورما - عيش سوري - ثومية - مخلل - بطاطس مقرمشة", prices: { "دجاج": 480, "ميكس": 570, "لحمة": 620 } },


  { id: 51, title: "بطاطا", category: "سندوتش البطاطا", description: "", prices: { "سوري": 30, "فرنساوي": 35 } },
  { id: 52, title: "بطاطا موتزاريلا", category: "سندوتش البطاطا", description: "", prices: { "سوري": 35, "فرنساوي": 40 } },
  { id: 53, title: "بطاطا شيدر", category: "سندوتش البطاطا", description: "", prices: { "سوري": 40, "فرنساوي": 45 } },


  { id: 54, title: "سكالوب بانية", category: "ريزو", description: "", prices: { "عادي": 75 } },
  { id: 55, title: "فاهيتا", category: "ريزو", description: "", prices: { "عادي": 75 } },
  { id: 56, title: "مكسيكي", category: "ريزو", description: "", prices: { "عادي": 80 } },
  { id: 57, title: "كرسبي", category: "ريزو", description: "", prices: { "عادي": 80 } },
  { id: 58, title: "زنجر", category: "ريزو", description: "", prices: { "عادي": 75 } },
  { id: 59, title: "شيش طاووق", category: "ريزو", description: "", prices: { "عادي": 75 } },


  { id: 60, title: "صوص باربيكيو", category: "مقبلات بارد", description: "", prices: { "عادي": 15 } },
  { id: 61, title: "ثومية", category: "مقبلات بارد", description: "", prices: { "عادي": 20 } },
  { id: 62, title: "ثومية سبايسي", category: "مقبلات بارد", description: "", prices: { "عادي": 25 } },
  { id: 63, title: "طحينة", category: "مقبلات بارد", description: "", prices: { "عادي": 25 } },
  { id: 64, title: "صوص شيدر", category: "مقبلات بارد", description: "", prices: { "عادي": 25 } },
  { id: 65, title: "عيش سوري", category: "مقبلات بارد", description: "", prices: { "عادي": 5 } },
  { id: 66, title: "كيس عيش لبناني", category: "مقبلات بارد", description: "", prices: { "عادي": 15 } },
  { id: 67, title: "عيش محمص + ثومية", category: "مقبلات بارد", description: "", prices: { "عادي": 20 } },
  { id: 68, title: "طبق مخلل صغير", category: "مقبلات بارد", description: "", prices: { "عادي": 10 } },
  { id: 69, title: "طبق مخلل كبير", category: "مقبلات بارد", description: "", prices: { "عادي": 20 } },


  { id: 70, title: "طبق بطاطا", category: "مقبلات ساخنة", description: "", prices: { "عادي": 20 } },
  { id: 71, title: "طبق بطاطا مع شيدر", category: "مقبلات ساخنة", description: "", prices: { "عادي": 45 } },
  { id: 72, title: "طبق أرز", category: "مقبلات ساخنة", description: "", prices: { "عادي": 30 } },


  { id: 73, title: "شاورما فراخ", category: "قسم الكريب", description: "", prices: { "عادي": 85 } },
  { id: 74, title: "شاورما لحمة", category: "قسم الكريب", description: "", prices: { "عادي": 110 } },
  { id: 75, title: "شاورما مكس", category: "قسم الكريب", description: "", prices: { "عادي": 95 } },
  { id: 76, title: "كرسبي", category: "قسم الكريب", description: "", prices: { "عادي": 90 } },
  { id: 77, title: "زنجر", category: "قسم الكريب", description: "", prices: { "عادي": 95 } },
  { id: 78, title: "سوبر كرانشي", category: "قسم الكريب", description: "", prices: { "عادي": 100 } },
  { id: 79, title: "اسكالوب بانيه", category: "قسم الكريب", description: "", prices: { "عادي": 95 } },
  { id: 80, title: "شيش طاووق", category: "قسم الكريب", description: "", prices: { "عادي": 95 } },
  { id: 81, title: "فاهيتا", category: "قسم الكريب", description: "", prices: { "عادي": 97 } },
  { id: 82, title: "مكسيكي", category: "قسم الكريب", description: "", prices: { "عادي": 95 } },
  { id: 83, title: "كفتة", category: "قسم الكريب", description: "", prices: { "عادي": 110 } },
  { id: 84, title: "هوت دوج", category: "قسم الكريب", description: "", prices: { "عادي": 85 } },
  { id: 85, title: "مشكل دجاج", category: "قسم الكريب", description: "", prices: { "عادي": 97 } },
  { id: 86, title: "مشكل لحوم", category: "قسم الكريب", description: "", prices: { "عادي": 105 } },
  { id: 87, title: "جامبو الابطال (مشكل لحوم اكسترا)", category: "قسم الكريب", description: "", prices: { "عادي": 170 } },
  { id: 88, title: "مشكل جبن", category: "قسم الكريب", description: "", prices: { "عادي": 70 } },
  { id: 89, title: "بطاطس موتزاريلا", category: "قسم الكريب", description: "", prices: { "عادي": 55 } },
  { id: 90, title: "تشيكن برجر", category: "قسم الكريب", description: "", prices: { "عادي": 95 } },
  { id: 91, title: "برجر لحمة", category: "قسم الكريب", description: "", prices: { "عادي": 110 } },


  { id: 92, title: "ربع ورك", category: "فراخ شواية سوري", description: "ربع دجاج مشوي متبلة بالخلطة المميزة مع الأرز البسمتي وأصابع البطاطس والمايونيز", prices: { "عادي": 85 } },
  { id: 93, title: "ربع صدر", category: "فراخ شواية سوري", description: "ربع دجاج مشوي متبلة بالخلطة المميزة مع الأرز البسمتي وأصابع البطاطس والمايونيز", prices: { "عادي": 115 } },
  { id: 94, title: "نصف فرخة", category: "فراخ شواية سوري", description: "نصف دجاج مشوي متبلة بالخلطة المميزة مع الأرز البسمتي وأصابع البطاطس والمايونيز", prices: { "عادي": 170 } },
  { id: 95, title: "فرخة كاملة", category: "فراخ شواية سوري", description: "دجاجة مشوية متبلة بالخلطة المميزة مع الأرز البسمتي وأصابع البطاطس والمايونيز", prices: { "عادي": 340 } },
  { id: 96, title: "دبل ورك", category: "فراخ شواية سوري", description: "2 ورك متبلة بالخلطة المميزة مع الأرز البسمتي وأصابع البطاطس والمايونيز", prices: { "عادي": 155 } },
  { id: 97, title: "دبل صدر", category: "فراخ شواية سوري", description: "2 صدر متبلة بالخلطة المميزة مع الأرز البسمتي وأصابع البطاطس والمايونيز", prices: { "عادي": 200 } },
  { id: 98, title: "فرخة سادة", category: "فراخ شواية سوري", description: "", prices: { "عادي": 290 } },


  { id: 99, title: "نصف فرخة", category: "فرايد تشيكن سوري", description: "بطاطس + ثومية + عيش + كاتشب", prices: { "عادي": 170 } },
  { id: 100, title: "نص فرايد تشيكن + قطعتين كرسبي", category: "فرايد تشيكن سوري", description: "بطاطس + ثومية + عيش + كاتشب", prices: { "عادي": 210 } },


  { id: 101, title: "ماريا شاورما", category: "ماريا", description: "", prices: { "دجاج": 130, "ميكس": 150, "لحمة": 170 } },
  { id: 102, title: "ماريا كرسبي", category: "ماريا", description: "", prices: { "عادي": 150 } },
  { id: 103, title: "ماريا كرانشي", category: "ماريا", description: "", prices: { "عادي": 160 } },
];