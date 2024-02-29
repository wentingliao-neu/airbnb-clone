export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
   searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
   const listings = await getListings(searchParams);
   const currentUser = await getCurrentUser();
   return (
      <ClientOnly>
         {listings.length === 0 ? (
            <EmptyState showReset />
         ) : (
            <Container>
               <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                  {listings.map((l: any) => (
                     <ListingCard
                        key={l.id}
                        data={l}
                        currentUser={currentUser}
                     />
                  ))}
               </div>
            </Container>
         )}
      </ClientOnly>
   );
};
export default Home;
