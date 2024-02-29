"use client";
import Image from "next/image";
export default function Avatar({ src }: { src: string | null | undefined }) {
   return (
      <Image
         src={src || "/images/placeholder.jpg"}
         alt="avatar"
         className="rounded-full "
         height="30"
         width="30"
      />
   );
}
