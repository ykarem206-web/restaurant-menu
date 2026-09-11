import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full flex justify-center items-center bg-linear-to-b from-neutral-900 to-neutral-800 py-6 lg:py-8 shadow-lg rounded-b-3xl lg:rounded-b-[3rem] mb-2 border-b-4 border-orange-500">
      <Image 
        alt="logo" 
        src="./images/IMG_013823.JPG" 
        width={160} 
        height={100} 
        className="rounded-2xl shadow-md object-contain bg-white/5 p-2 lg:scale-110 transition-transform" 
        unoptimized
      />
    </div>
  );
}