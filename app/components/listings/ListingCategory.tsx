"use client";

import { IconType } from "react-icons";

export default function ListingCategory({
   icon: Icon,
   label,
   description,
}: {
   icon: IconType;
   label: string;
   description: string;
}) {
   return (
      <div className="flex flex-col gap-6">
         <div className="flex flex-row items-center gap-4">
            <Icon size={40} className="text-neutral-600" />
            <div className="flex flex-col">
               <div className="text-lg font-semibold">{label}</div>
               <div className="text-neutral-500 font-light">{description}</div>
            </div>
         </div>
      </div>
   );
}
