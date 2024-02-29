import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

export default async function PropertiesPage() {
   const currentUser = await getCurrentUser();
   if (!currentUser)
      return (
         <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
         </ClientOnly>
      );

   const listings = await getListings({ userId: currentUser.id });

   return (
      <ClientOnly>
         {listings.length === 0 ? (
            <EmptyState
               title="No properties found"
               subtitle="Looks like you have no properties"
            />
         ) : (
            <PropertiesClient listings={listings} currentUser={currentUser} />
         )}
      </ClientOnly>
   );
}
