import { User, Listing, Reservation } from "@prisma/client";

export type safeUser = Omit<User, "createAt" | "updateAt" | "emailVerified"> & {
   createAt: string;
   updateAt: string;
   emailVerified: string | null;
};

export type safeListing = Omit<Listing, "createAt"> & {
   createAt: string;
};

export type safeReservation = Omit<
   Reservation,
   "createAt" | "startDate" | "endDate" | "listing"
> & {
   createAt: string;
   startDate: string;
   endDate: string;
   listing: safeListing;
};
