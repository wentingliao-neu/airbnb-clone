import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

export default async function ReservationsPage() {
   const currentUser = await getCurrentUser();
   if (!currentUser)
      return (
         <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
         </ClientOnly>
      );
   const reservations = await getReservations({ authorId: currentUser.id });

   return (
      <ClientOnly>
         {reservations.length === 0 ? (
            <EmptyState
               title="No reservation found"
               subtitle="Looks like you have no reservation on your proporities"
            />
         ) : (
            <ReservationsClient
               reservations={reservations}
               currentUser={currentUser}
            />
         )}
      </ClientOnly>
   );
}
