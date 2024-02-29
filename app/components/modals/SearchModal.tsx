"use client";
import queryString from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
   LOCATION = 0,
   DATE = 1,
   INFO = 2,
}

const SearchModal = () => {
   const router = useRouter();
   const params = useSearchParams();
   const searchModal = useSearchModal();
   const [location, setLocation] = useState<CountrySelectValue>();
   const [step, setStep] = useState(STEPS.LOCATION);
   const [guestCount, setGuestCount] = useState(1);
   const [roomCount, setRoomCount] = useState(1);
   const [bathroomCount, setBathroomCount] = useState(1);
   const [dateRange, setDateRange] = useState<Range>({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
   });

   const Map = useMemo(
      () => dynamic(() => import("../Map"), { ssr: false }),
      [location]
   );
   const onBack = useCallback(() => {
      setStep((v) => v - 1);
   }, []);
   const onNext = useCallback(() => {
      setStep((v) => v + 1);
   }, []);

   const onSubmit = useCallback(async () => {
      if (step !== STEPS.INFO) return onNext();

      let currentQuery = {};
      if (params) {
         currentQuery = queryString.parse(params.toString());
      }
      const updatedQuery: any = {
         ...currentQuery,
         locationValue: location?.value,
         guestCount,
         roomCount,
         bathroomCount,
      };

      if (dateRange.startDate)
         updatedQuery.startDate = formatISO(dateRange.startDate);

      if (dateRange.endDate)
         updatedQuery.endDate = formatISO(dateRange.endDate);

      const url = queryString.stringifyUrl(
         { url: "/", query: updatedQuery },
         { skipNull: true }
      );
      setStep(STEPS.LOCATION);
      searchModal.onClose();
      router.push(url);
   }, [
      bathroomCount,
      dateRange,
      guestCount,
      location,
      onNext,
      params,
      roomCount,
      router,
      searchModal,
      step,
   ]);

   const actionLabel = useMemo(() => {
      return step === STEPS.INFO ? "Search" : "Next";
   }, [step]);
   const SecondaryActionLabel = useMemo(() => {
      return step === STEPS.LOCATION ? undefined : "Back";
   }, [step]);

   const bodyContents = [
      <div className="flex flex-col gap-8" key={STEPS.LOCATION}>
         <Heading
            title="Where do you want to go?"
            subtitle="Find the perfect location!"
         />
         <CountrySelect
            value={location}
            onChange={(value) => {
               setLocation(value as CountrySelectValue);
            }}
         />
         <hr />
         <Map center={location?.latlng} />
      </div>,
      <div className="flex flex-col gap-8" key={STEPS.DATE}>
         <Heading
            title="When do you want to go?"
            subtitle="Make sure everyone is free!"
         />
         <Calendar
            value={dateRange}
            onChange={(v) => setDateRange(v.selection)}
         />
      </div>,
      <div className="flex flex-col gap-8" key={STEPS.INFO}>
         <Heading
            title="More information"
            subtitle="Find your perfect place!"
         />
         <Counter
            title="Guests"
            subtitle="How many guests are coming?"
            value={guestCount}
            onChange={(v) => setGuestCount(v)}
         />
         <Counter
            title="Rooms"
            subtitle="How many rooms do you need?"
            value={roomCount}
            onChange={(v) => setRoomCount(v)}
         />
         <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={bathroomCount}
            onChange={(v) => setBathroomCount(v)}
         />
      </div>,
   ];

   return (
      <Modal
         isOpen={searchModal.isOpen}
         onClose={searchModal.onClose}
         onSubmit={onSubmit}
         title="Filters"
         actionLabel={actionLabel}
         secondaryLabel={SecondaryActionLabel}
         secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
         body={bodyContents[step]}
      />
   );
};

export default SearchModal;
