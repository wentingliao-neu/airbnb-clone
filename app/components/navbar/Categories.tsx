"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import {
   GiBarn,
   GiBoatFishing,
   GiCactus,
   GiCastle,
   GiCaveEntrance,
   GiForestCamp,
   GiIsland,
   GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
   {
      label: "Beach",
      icon: TbBeach,
      description: "close to beach",
   },
   {
      label: "Windmills",
      icon: GiWindmill,
      description: "windmills",
   },
   {
      label: "Modern",
      icon: MdOutlineVilla,
      description: "modern",
   },
   {
      label: "Countryside",
      icon: TbMountain,
      description: "countryside",
   },
   {
      label: "Pools",
      icon: TbPool,
      description: "pool",
   },
   {
      label: "Islands",
      icon: GiIsland,
      description: "island",
   },
   {
      label: "Lake",
      icon: GiBoatFishing,
      description: "lake",
   },
   {
      label: "Skiing",
      icon: FaSkiing,
      description: "skiing",
   },
   {
      label: "Castles",
      icon: GiCastle,
      description: "castle",
   },
   {
      label: "Camping",
      icon: GiForestCamp,
      description: "camping",
   },
   {
      label: "Arctic",
      icon: BsSnow,
      description: "snow",
   },
   {
      label: "Cave",
      icon: GiCaveEntrance,
      description: "cave",
   },
   {
      label: "Desert",
      icon: GiCactus,
      description: "desert",
   },
   {
      label: "Barns",
      icon: GiBarn,
      description: "barn",
   },
   {
      label: "Lux",
      icon: IoDiamond,
      description: "luxury",
   },
];

export default function Categories() {
   const params = useSearchParams();
   const category = params?.get("category");
   const pathname = usePathname();
   const isMainPage = pathname === "/";
   if (!isMainPage) return null;
   return (
      <Container>
         <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
               <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={item.label === category}
                  icon={item.icon}
               />
            ))}
         </div>
      </Container>
   );
}
