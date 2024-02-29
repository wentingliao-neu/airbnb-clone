"use client";
import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { safeUser } from "@/app/types";
import Categories from "./Categories";

interface Props {
   currentUser?: safeUser | null;
}

const Navbar: React.FC<Props> = ({ currentUser }) => {
   return (
      <nav className="fixed w-full bg-white z-10 shadow-sm">
         <div className="py-4 border-b-[1px]">
            <Container>
               <div className="flex flex-grow justify-between items-center gap-3 md:gap-0">
                  <Logo />
                  <Search />
                  <UserMenu currentUser={currentUser} />
               </div>
            </Container>
         </div>
         <Categories />
      </nav>
   );
};
export default Navbar;
