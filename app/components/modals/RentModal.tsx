"use client";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Map from "../Map";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
   CATEGORY = 0,
   LOCATION = 1,
   INFO = 2,
   IMAGES = 3,
   DESCRIPTION = 4,
   PRICE = 5,
}
export default function RentModal() {
   const rentModal = useRentModal();
   const [step, setStep] = useState(STEPS.CATEGORY);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const actionLabel = useMemo(() => {
      return step === STEPS.PRICE ? "Create" : "Next";
   }, [step]);
   const secondaryActionLabel = useMemo(() => {
      return step === STEPS.CATEGORY ? undefined : "Back";
   }, [step]);

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
      reset,
   } = useForm<FieldValues>({
      defaultValues: {
         category: "",
         location: null,
         guestCount: 1,
         roomCount: 1,
         bathroomCount: 1,
         imageSrc: "",
         price: 1,
         title: "",
         description: "",
      },
   });

   const category = watch("category");
   const location = watch("location");
   const guestCount = watch("guestCount");
   const roomCount = watch("roomCount");
   const bathroomCount = watch("bathroomCount");
   const imageSrc = watch("imageSrc");
   const Map = useMemo(
      () => dynamic(() => import("../Map"), { ssr: false }),
      [location]
   );
   const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
         shouldDirty: true,
         shouldTouch: true,
         shouldValidate: true,
      });
   };

   function onBack() {
      setStep((a) => a - 1);
   }
   function onNext() {
      setStep((a) => a + 1);
   }

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if (step !== STEPS.PRICE) return onNext();
      setIsLoading(true);
      axios
         .post("/api/listings", data)
         .then(() => {
            toast.success("Listing Created!");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
         })
         .catch(() => {
            toast.error("Listing failed.");
         })
         .finally(() => setIsLoading(false));
   };

   const contents = [
      <div key={STEPS.CATEGORY} className="flex flex-col gap-8">
         <Heading
            title="Which of these best describe your place?"
            subtitle="Pick a category"
         />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
               <div key={item.label} className="col-span-1">
                  <CategoryInput
                     onClick={(category) => {
                        setCustomValue("category", category);
                     }}
                     selected={category === item.label}
                     label={item.label}
                     icon={item.icon}
                  />
               </div>
            ))}
         </div>
      </div>,

      <div key={STEPS.LOCATION} className="flex flex-col gap-8">
         <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
         />
         <CountrySelect
            value={location}
            onChange={(v) => setCustomValue("location", v)}
         />
         <Map center={location?.latlng} />
      </div>,

      <div key={STEPS.INFO} className="flex flex-col gap-8">
         <Heading
            title="Share something basics about your place"
            subtitle="What amenities do you have?"
         />
         <Counter
            title="Number of guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(v) => setCustomValue("guestCount", v)}
         />
         <hr />
         <Counter
            title="Number of rooms"
            subtitle="How many rooms do you allow?"
            value={roomCount}
            onChange={(v) => setCustomValue("roomCount", v)}
         />
         <hr />
         <Counter
            title="Number of bathrooms"
            subtitle="How many bathrooms do you allow?"
            value={bathroomCount}
            onChange={(v) => setCustomValue("bathroomCount", v)}
         />
      </div>,

      <div key={STEPS.IMAGES} className="flex flex-col gap-8">
         <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like"
         />
         <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
         />
      </div>,

      <div key={STEPS.DESCRIPTION} className="flex flex-col gap-8">
         <Heading
            title="How would you describe your place?"
            subtitle="Short and brief"
         />
         <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
         <hr />
         <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
      </div>,
      <div key={STEPS.PRICE} className="flex flex-col gap-8">
         <Heading
            title="Now, set your price."
            subtitle="How much do you charge per night?"
         />
         <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
      </div>,
   ];

   //    let body = (
   //       <div className="flex flex-col gap-8">
   //          <Heading
   //             title="Which of these best describe your place?"
   //             subtitle="Pick a category"
   //          />
   //          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
   //             {categories.map((item) => (
   //                <div key={item.label} className="col-span-1">
   //                   <CategoryInput
   //                      onClick={(category) => {
   //                         setCustomValue("category", category);
   //                      }}
   //                      selected={category === item.label}
   //                      label={item.label}
   //                      icon={item.icon}
   //                   />
   //                </div>
   //             ))}
   //          </div>
   //       </div>
   //    );

   //    if (step === STEPS.LOCATION) {
   //       body = <div>location</div>;
   //    }
   let body = contents[step];
   return (
      <Modal
         title="Airbnb your home!"
         isOpen={rentModal.isOpen}
         onClose={rentModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         actionLabel={actionLabel}
         secondaryLabel={secondaryActionLabel}
         secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
         body={body}
      />
   );
}
