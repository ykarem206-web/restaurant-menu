import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full flex justify-center items-center bg-neutral-900 py-5 shadow-md rounded-b-3xl mb-4 border-b-4 border-amber-500">
      <Image 
        alt="logo" 
        src="/images/IMG_013823.JPG" 
        width={150} 
        height={100} 
        className="rounded-xl shadow-lg object-contain" 
      />
    </div>
  );
}