"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { safeListing, safeReservation, safeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

export default function TripsClient({
   listings,
   currentUser,
}: {
   listings: safeListing[];
   currentUser?: safeUser | null;
}) {
   const router = useRouter();
   const [deletingId, setDeletingId] = useState("");

   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id);
         axios
            .delete(`/api/listings/${id}`)
            .then(() => {
               toast.success("listing deleled");
               router.refresh();
            })
            .catch((err) => {
               toast.error(err?.response?.data?.error);
            })
            .finally(() => {
               setDeletingId("");
            });
      },
      [router]
   );
   return (
      <Container>
         <Heading title="Properties" subtitle="List of your properties" />
         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
               <ListingCard
                  key={listing.id}
                  data={listing}
                  actionId={listing.id}
                  onAction={onCancel}
                  disabled={deletingId === listing.id}
                  actionLabel="Delete property"
                  currentUser={currentUser}
               />
            ))}
         </div>
      </Container>
   );
}
