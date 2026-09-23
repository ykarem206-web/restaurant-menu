import Image from "next/image";

export default function Header() {
  return (
    <div className="relative w-full mb-16 md:mb-20">
      
      <div className="relative w-full h-55 md:h-95 lg:h-112.5 rounded-b-4xl overflow-hidden shadow-sm">
        <Image
          src="/cover.png" 
          alt="كڤر مطعم بيت الشام"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 md:-bottom-14 z-10">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-[5px] border-gray-50 bg-white overflow-hidden shadow-lg flex items-center justify-center">
          <Image
            src="/logo.png" 
            alt="لوجو بيت الشام"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
    </div>
  );
}