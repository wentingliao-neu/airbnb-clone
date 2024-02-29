import Image from "next/image";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
   searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
   const listings = await getListings(searchParams);
   const currentUser = await getCurrentUser();
   return (
      <ClientOnly>
         {listings.length === 0 ? (
            <EmptyState showReset />
         ) : (
            <Container>
               <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                  <div>
                     {listings.map((l) => (
                        <ListingCard
                           key={l.id}
                           data={l}
                           currentUser={currentUser}
                        />
                     ))}
                  </div>
               </div>
            </Container>
         )}
      </ClientOnly>
   );
}
