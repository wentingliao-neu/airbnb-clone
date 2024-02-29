"use client";
import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
const ErrorState = ({ error }: { error: Error }) => {
   useEffect(() => {
      console.log(error);
   }, [error]);
   return (
      <EmptyState
         title="Something went wrong"
         subtitle="Please check your network"
      />
   );
};
export default ErrorState;
