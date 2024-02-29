import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

export default async function TripsPage() {
   const currentUser = await getCurrentUser();
   if (!currentUser)
      return (
         <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
         </ClientOnly>
      );

   const reservations = await getReservations({ userId: currentUser.id });

   return (
      <ClientOnly>
         {reservations.length === 0 ? (
            <EmptyState
               title="No trips found"
               subtitle="Looks like you haven't reserved any trips"
            />
         ) : (
            <TripsClient
               reservations={reservations}
               currentUser={currentUser}
            />
         )}
      </ClientOnly>
   );
}
